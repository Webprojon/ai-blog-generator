//export async function POST(request) {
//	const { prompt } = await request.json();

//	const response = await fetch("https://api.google.com/bard", {
//		method: "POST",
//		headers: {
//			"Content-Type": "application/json",
//			Authorization: `Bearer ${process.env.GOOGLE_API_KEY}`,
//		},
//		body: JSON.stringify({
//			prompt: prompt,
//		}),
//	});

//	if (!response.ok) {
//		return new Response(JSON.stringify({ error: "API request failed" }), {
//			status: 500,
//		});
//	}

//	const data = await response.json();
//	return new Response(JSON.stringify(data), { status: 200 });
//}
