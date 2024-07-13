let playing = true;
let interval;

const counter = document.getElementById("counter");
const minus = document.getElementById("minus");
const plus = document.getElementById("plus");
const heart = document.getElementById("heart");
const pause = document.getElementById("pause");
const commentForm = document.querySelector("form");

function startTimer() {
	return setInterval(() => {
		counter.innerText = parseInt(counter.innerText) + 1;
	}, 1000);
}

function toggleButtons(disable) {
	document.querySelectorAll("button").forEach((btn) => {
		if (btn.id ==! "pause") btn.disabled = disable;
	});
}

function updateLikes() {
	const count = parseInt(counter.innerText);
	const likesList = document.querySelector(".likes");
	let likeItem = document.querySelector(`[data-num="${count}"]`);

	if (likeItem) {
		const span = likeItem.querySelector("span");
		span.innerText = parseInt(span.innerText) + 1;
	} else {
		likeItem = document.createElement("li");
		likeItem.setAttribute("data-num", count);
		likeItem.innerHTML = `${count} has been liked <span>1</span> time`;
		likesList.appendChild(likeItem);
	}
}

interval =startTimer();

minus.addEventListener("click", () => {
	counter.innerText = parseInt(counter.innerText) - 1;
});

plus.addEventListener("click", () => {
	counter.innerText = parseInt(counter.innerText) + 1;
});

heart.addEventListener("click", updateLikes);

pause.addEventListener("click", () => {
	playing = !playing;

	if (playing) {
		interval = startTimer();
		pause.innerText = "pause";
	} else {
		clearInterval(interval);
		pause.innerText = "resume";
	}
	toggleButtons(!playing);
});

commentForm.addEventListener("submit", (event) => {
	event.preventDefault();
	const commentInput = commentForm.querySelector("input");
	const comment = commentInput.value;
	commentInput.value = "";

	const commentsList = document.querySelector(".comments");
	const commentItem = document.createElement("p");
	commentItem.innerText = comment;
	commentsList.appendChild(commentItem);
});
