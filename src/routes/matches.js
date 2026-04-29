import { Router } from "express";

const matches = [];

export function createMatchesRouter({ broadcast } = {}) {
  const router = Router();

  router.get("/", (req, res) => {
    res.json({
      success: true,
      count: matches.length,
      data: matches,
    });
  });

  router.post("/", (req, res) => {
    const payload = req.body?.data ?? req.body;

    if (!payload || typeof payload !== "object") {
      return res.status(400).json({
        success: false,
        message: "Invalid payload. Send a JSON object in body.",
      });
    }

    const match = {
      id: payload.id ?? Date.now(),
      sport: payload.sport ?? "football",
      homeTeam: payload.homeTeam ?? "TBD",
      awayTeam: payload.awayTeam ?? "TBD",
      status: payload.status ?? "scheduled",
      startTime: payload.startTime ?? null,
      endTime: payload.endTime ?? null,
      homeScore: payload.homeScore ?? 0,
      awayScore: payload.awayScore ?? 0,
      createdAt: payload.createdAt ?? new Date().toISOString(),
    };

    matches.push(match);

    if (typeof broadcast === "function") {
      broadcast({
        type: "match_created",
        data: match,
      });
    }

    return res.status(201).json({
      success: true,
      data: match,
    });
  });

  return router;
}
