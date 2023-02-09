export async function getUserIp() {
    const response = await fetch('https://ipapi.co/json/');
    const json = await response.json();
    return json.ip;
}
