const name = location.href.split("/").pop().slice(0, -5);
const now = new Date(Date.now());

fetch("./timetables/" + name + ".json")
  .then((response) => response.json())
  .then((json) => writeData(json));

function createTimeString(timings) {
  let timeString = "";
  if (timings.length > 0) {
    timeString += timings[0].toString().padStart(2, "0") + ":";
    timeString += timings[1].toString().padStart(2, "0") + "-";
    timeString += timings[2].toString().padStart(2, "0") + ":";
    timeString += timings[3].toString().padStart(2, "0");
  }
  return timeString;
}

function writeData(periods) {
  for (let i = 0; i < 5; i++) {
    let table = document.getElementsByTagName("table")[i];
    const periodsToday = periods[i];
    for (let j = 0; j < periodsToday.length; j++) {
      const period = periodsToday[1];
      table.innerHTML += `<tr>
        <td>${createTimeString(period["timings"])}</td>
        <td>${period["venue"]}</td>
        <td>${period["title"]}</td>
      </tr>`;
    }
  }
}
