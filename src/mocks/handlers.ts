import { rest } from "msw";

const db: Db = {
  connectors: {
    c00: {
      name: "My Connector",
      printers: [{ id: "p00", state: "unassigned" }],
    },
  },
  printers: {
    p00: {
      name: "My Printer",
      description: "Printer in my office",
    },
  },
  registrations: {},
};

export const handlers = [
  rest.get("/connectors/:connectorId", (req, res, ctx) => {
    const { connectorId } = req.params;
    return res(ctx.json({ ...db.connectors[connectorId], id: connectorId }));
  }),

  rest.get("/registrations/:registrationId", (req, res, ctx) => {
    const { registrationId } = req.params;
    const registration = db.registrations[registrationId];
    return res(ctx.json(registration));
  }),

  rest.post("/registrations", (req, res, ctx) => {
    const printerId = req.url.searchParams.get("printerId");
    const connectorId = req.url.searchParams.get("connectorId");

    if (connectorId) {
      const { state } = db.connectors[connectorId].printers.find(
        (printer) => printer.id === printerId
      )!;

      if (state === "unassigned") {
        const registrationId = `r${printerId}`;
        db.registrations[registrationId] = "processing";

        wait(5000).then(() => {
          if (connectorId) {
            db.connectors[connectorId].printers = db.connectors[
              connectorId
            ].printers.map((printer) =>
              printer.id === printerId
                ? { ...printer, state: "assigned" }
                : printer
            );
            db.registrations[registrationId] = "done";
          }
        });
        return res(ctx.json({ id: registrationId }));
      }
    } else {
      return res(ctx.status(500, "missing connectorId"));
    }
  }),

  rest.get("/printers", (req, res, ctx) => {
    const connectorId = req.url.searchParams.get("connectorId");

    if (connectorId) {
      return res(
        ctx.json(
          db.connectors[connectorId].printers.map(({ id }) => ({
            ...Object.entries(db.printers).find(
              ([printerId]) => printerId === id
            )![1],
            id,
          }))
        )
      );
    }
  }),
];

const wait = (ms: number) => new Promise((res) => setTimeout(res, ms));

type Db = {
  connectors: {
    [id: string]: {
      name: string;
      printers: { id: string; state: "assigned" | "unassigned" | "busy" }[];
    };
  };
  printers: {
    [id: string]: {
      name: string;
      description: string;
    };
  };
  registrations: {
    [id: string]: "idle" | "processing" | "done";
  };
};
