function calculateAge() {

    const dobInput = document.getElementById("dob").value;

    if (dobInput === "") {
        document.getElementById("message").textContent =
            "Please select your date of birth.";
        return;
    }

    const birthDate = new Date(dobInput);
    const today = new Date();

    if (birthDate > today) {
        document.getElementById("message").textContent =
            "Date of birth cannot be in the future.";
        return;
    }

    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();

    if (days < 0) {
        months--;

        const previousMonth = new Date(
            today.getFullYear(),
            today.getMonth(),
            0
        );

        days += previousMonth.getDate();
    }

    if (months < 0) {
        years--;
        months += 12;
    }

    document.getElementById("years").textContent = years;
    document.getElementById("months").textContent = months;
    document.getElementById("days").textContent = days;

    document.getElementById("message").textContent =
        `You are ${years} years, ${months} months and ${days} days old.`;
}