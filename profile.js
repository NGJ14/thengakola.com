const name = location.href.split("/").pop().slice(0, -5);
const day = (new Date(Date.now()).getDay() - 1) % 7;

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
    let table = $("table")[i];
    const periodsToday = periods[i];
    for (let j = 0; j < periodsToday.length; j++) {
      const period = periodsToday[j];
      table.innerHTML += `<tr>
        <td>${createTimeString(period["timings"])}</td>
        <td>${period["venue"]}</td>
        <td>${period["title"]}</td>
      </tr>`;
    }
    if (day == i) {
      $(".dayName")[day].style.background = "var(--busy)";
      table.style.border = "2px solid var(--busy)";
      $(table).find("tr").css("border-bottom", "1.8px solid var(--busy)");
    }
  }
}
