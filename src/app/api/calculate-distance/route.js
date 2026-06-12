export async function POST(req) {
    try {
        const { fromZip, toZip } =
            await req.json();

const geo = async (postal) => {
    const formatted = postal
        .replace(/\s/g, "")
        .toUpperCase()
        .replace(
            /^([A-Z]\d[A-Z])(\d[A-Z]\d)$/,
            "$1 $2"
        );

    const res = await fetch(
        `https://api.openrouteservice.org/geocode/search?` +
        new URLSearchParams({
            text: formatted,
            "boundary.country": "CA",
            size: "1",
        }),
        {
            headers: {
                Authorization:
                    process.env.NEXT_PUBLIC_ORS_KEY,
            },
        }
    );

    const data = await res.json();

    console.log(data);

    const feature =
        data.features?.[0];

    if (!feature) {
        throw new Error(
            `Postal code not found: ${formatted}`
        );
    }

    return feature.geometry.coordinates;
};

        const start =
            await geo(fromZip);

        const end =
            await geo(toZip);

            console.log({
    start,
    end,
});

        const route =
            await fetch(
                "https://api.openrouteservice.org/v2/directions/driving-car",
                {
                    method: "POST",
                    headers: {
                        Authorization:
                            process.env.NEXT_PUBLIC_ORS_KEY, 
                        "Content-Type":
                            "application/json",
                    },
                    body: JSON.stringify({
    coordinates: [start, end],

    radiuses: [
        10000,
        10000
    ], // 10km snap

    instructions: false
})
                }
            );

        const result =
            await route.json();

        console.log(
            "ORS:",
            result
        );

        if (
            !route.ok ||
            !result.routes?.length
        ) {
            throw new Error(
                result.error?.message ||
                    "Route calculation failed"
            );
        }

        const kms =
            result.routes[0]
                .summary.distance /
            1000;

        return Response.json({
            kms,
        });
    } catch (err) {
        return Response.json(
            {
                error:
                    err.message,
            },
            {
                status: 400,
            }
        );
    }
}