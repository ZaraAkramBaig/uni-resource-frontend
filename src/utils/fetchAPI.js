export async function fetchAPI(url, method, body) {
    let response;
    if (method === "GET" || method === "DELETE") {
        response = await fetch(url, {
        method,
        headers: {
        'Content-Type': 'application/json',
        },
    });
    }   else {
        response = await fetch(url, {
            method,
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });
    }
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    let res = await response.json();
    console.log(res);
    return res;
}