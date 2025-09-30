window.onload = () => {
    // whether they are awake
    function isAwake(hour, start, end) {
        if (start === end) { 
            return true; 
        }
        if (start < end)   { 
            return hour >= start && hour < end; 
        }
        return hour >= start || hour < end; // midnight
    }


    function time() {
        const now = new Date();

        const nyStr = now.toLocaleTimeString("en-US", {
            timeZone: "America/New_York",
            hour12: true
        });
        const krStr = now.toLocaleTimeString("en-US", {
            timeZone: "Asia/Seoul",
            hour12: false
        });

        // embed on screen
        document.getElementById("timeBeebadoobe").textContent = nyStr;
        document.getElementById("timeJames").textContent = krStr;

        // read input values
        const wakeStartJames = Number(document.getElementById("wakeStartJames").value);
        const wakeEndJames   = Number(document.getElementById("wakeEndJames").value);
        const wakeStartBee   = Number(document.getElementById("wakeStartBeebadoobe").value);
        const wakeEndBee     = Number(document.getElementById("wakeEndBeebadoobe").value);

        // time for New York and Seoul
        const nyHour = new Date(now.toLocaleString("en-US", { timeZone: "America/New_York" })).getHours();
        const krHour = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Seoul" })).getHours();

        // Status
        document.getElementById("statusBeebadoobe").textContent =
            `status: ${isAwake(nyHour, wakeStartBee, wakeEndBee) ? "awake" : "asleep"}`;
        document.getElementById("statusJames").textContent =
            `status: ${isAwake(krHour, wakeStartJames, wakeEndJames) ? "awake" : "asleep"}`;
    }

    setInterval(time, 1000);
    time();
}

        