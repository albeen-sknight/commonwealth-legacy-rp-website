export default {
  async fetch(request, env, ctx) {
    if (request.method !== "POST") {
      return new Response(JSON.stringify({ ok: false, error: "Method not allowed" }), {
        status: 405,
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
      });
    }

    const headers = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type"
    };

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers });
    }

    try {
      const body = await request.json();

      // Honey pot check
      if (body.website && body.website.trim() !== "") {
        return new Response(JSON.stringify({ ok: false, error: "Spam detected." }), { status: 400, headers });
      }

      // Age Validation (Strictly 16+)
      const age = parseInt(body.age, 10);
      if (isNaN(age) || age < 16) {
        return new Response(JSON.stringify({ ok: false, error: "Minimum age requirement of 16 not met." }), { status: 400, headers });
      }

      // Required fields validation
      const requiredFields = [
        "discordName",
        "discordId",
        "timezone",
        "characterName",
        "department",
        "experience",
        "availability",
        "motivation",
        "roleplayMeaning",
        "scenario"
      ];

      for (const field of requiredFields) {
        if (!body[field] || body[field].toString().trim() === "") {
          return new Response(JSON.stringify({ ok: false, error: `Required field missing: ${field}` }), { status: 400, headers });
        }
      }

      if (!/^\d+$/.test(body.discordId)) {
        return new Response(JSON.stringify({ ok: false, error: "Discord User ID must be a numerical value." }), { status: 400, headers });
      }

      // Map department keys to human-readable labels
      const departmentLabels = {
        vsp: "Virginia State Police (VSP)",
        vbso: "Virginia Beach Sheriff's Office (VBSO)",
        vems: "Virginia Emergency Medical Services (VEMS)",
        doj: "Department of Justice (DOJ)",
        civilian: "Civilian",
        staff: "Staff"
      };

      const deptLabel = departmentLabels[body.department.toLowerCase()] || body.department;

      // Safe field truncation helper (Discord embed fields max 1024 chars)
      const truncate = (val, max = 1000) => {
        if (!val) return "N/A";
        const str = val.toString().trim();
        if (str.length > max) {
          return str.slice(0, max) + "\n\n... (truncated)";
        }
        return str;
      };

      // Construct Discord Embed Payload
      const embedPayload = {
        username: "Commonwealth Legacy Application System",
        avatar_url: "https://commonwealth-legacy-rp-website.pages.dev/favicon.png",
        embeds: [
          {
            title: "New Whitelist Application Submitted",
            color: 0x00E5FF, // Beacon Cyan
            timestamp: new Date().toISOString(),
            footer: {
              text: "Commonwealth Legacy RP | Whitelist Gatekeeper",
              icon_url: "https://commonwealth-legacy-rp-website.pages.dev/favicon.png"
            },
            fields: [
              { name: "Discord Name", value: truncate(body.discordName, 250), inline: true },
              { name: "Discord User ID", value: truncate(body.discordId, 250), inline: true },
              { name: "Real Age", value: truncate(body.age, 10), inline: true },
              { name: "Timezone", value: truncate(body.timezone, 100), inline: true },
              { name: "Availability", value: `${truncate(body.availability, 50)} hours/week`, inline: true },
              { name: "Department Focus", value: truncate(deptLabel, 100), inline: true },
              { name: "Planned Character Name", value: truncate(body.characterName, 250), inline: false },
              { name: "What is Roleplay?", value: truncate(body.roleplayMeaning, 1000), inline: false },
              { name: "Roleplay Experience", value: truncate(body.experience, 1000), inline: false },
              { name: "Character Backstory", value: truncate(body.motivation, 1000), inline: false },
              { name: "Scenario Answers", value: truncate(body.scenario, 1000), inline: false }
            ]
          }
        ]
      };

      // Send to Discord Webhook
      const webhookUrl = env.DISCORD_WEBHOOK_URL;
      if (!webhookUrl) {
        return new Response(JSON.stringify({ ok: false, error: "Discord webhook endpoint not configured on server." }), { status: 500, headers });
      }

      const discordResponse = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(embedPayload)
      });

      if (!discordResponse.ok) {
        const errorText = await discordResponse.text();
        return new Response(JSON.stringify({ ok: false, error: `Failed to forward application to Discord: ${errorText}` }), { status: 502, headers });
      }

      return new Response(JSON.stringify({ ok: true, message: "Application submitted. Staff will review it in Discord." }), { status: 200, headers });

    } catch (err) {
      return new Response(JSON.stringify({ ok: false, error: `Internal Server Error: ${err.message}` }), { status: 500, headers });
    }
  }
};
