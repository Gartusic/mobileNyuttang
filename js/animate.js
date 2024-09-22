function fadeIn(target) {
	var level = 0;
	var inTimer = null;
	inTimer = setInterval( function() {
		level = fadeInAction(target, level, inTimer);
	}, 50);
}
function fadeInAction(target, level, inTimer) {
	level = level + 0.1;
	changeOpacity(target, level);
	if(level>1) clearInterval(inTimer);
	return level;
}
function fadeOut(target) {
	var level = 1;
	var outTimer = null;
	outTimer = setInterval( function() {
		level = fadeOutAction(target, level, outTimer);
	}, 50);
}
function fadeOutAction(target, level, outTimer) {
	level = level - 0.1;
	changeOpacity(target, level);
	if(level < 0) {
		clearInterval(outTimer);
	}
	return level;
}
function changeOpacity(target, level) {
	var obj = target;
	obj.style.opacity = level;
	obj.style.MozOpacity = level;
	obj.style.KhtmlOpacity = level;
	obj.style.MsFilter = "'progid: DXImageTransform.Microsoft.Alpha(Opacity=" + (level * 100) + ")'";
	obj.style.filter = "alpha(opacity=" + (level * 100) + ");";
}

// Gallary sticky and scroll animation
// observer define
const options = {}
const observer = new IntersectionObserver((entries, observer) => {
    // console.log(entries)
    entries.forEach((targetElement) => {
		if (!targetElement.isIntersecting) return;
        
		// targetElement.target.style.opacity = 1;

		if (targetElement.target.classList[0] === "greetings") {
			console.log("properly in")
			targetElement.target.style.opacity = 1;
		}

		observer.unobserve(targetElement.target);
    });
}, options)


const observeFunc = () => {
	console.log("hello world");
	
	// define
	// const galleryTarget = document.querySelectorAll(".gallery-item")
	const allTarget = document.querySelectorAll("body *:not(script,style,title)")

	// observe Start
	for ( let i=0; i < allTarget.length; i++ ) {
		observer.observe(allTarget[i])
	}
}


/**
 * 일, 시간, 분, 초를 남은 시간을 통해서 알 수 있게
 * 	<span class="d-day-left-day"></span>일 
	<span class="d-day-left-hours"></span>시간 
	<span class="d-day-left-minutes"></span>분 
	<span class="d-day-left-seconds"></span>초
 */

const dDay = new Date("2024-11-09T12:00:00").getTime();
const dDayLeftShow = () => {
	const leftCountdown = document.querySelector(".d-day-left-countdown"); 

	const now = new Date().getTime();
	const distance = dDay - now;

	// 시간 계산
	const days = Math.floor(distance / (1000 * 60 * 60 * 24));
	const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
	const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
	const seconds = Math.floor((distance % (1000 * 60)) / 1000);

	// 결과 출력
	leftCountdown.innerHTML =
		days + "일 " + hours + "시간 " + minutes + "분 " + seconds + "초 ";

	// 시간이 끝나면 메시지 표시
	if (distance < 0) {
		clearInterval(countdownInterval);
		document.getElementById("countdown").innerHTML = "D-day가 지났습니다!";
	}	

}
// d-day end

/**
 * modal annotation
 * this funcion shows that husband and wife family accounts when client clicking the btn.
 * fuck 
 */

const modalHTMLShowFunc = (accountSex) => {
	if(accountSex !== null){
		accountSex = accountSex.split(" ")
	} else {
		return;
	}
	// changed information by the accountSex param
	let name = ""; // name
	let onsideName = ""; // 신부측, 신랑측
	let accounts = [];
	
	const modalContents = document.querySelector(".modal-contents-in");
	modalContents.innerHTML = "";
	
	if (String(accountSex[0]) === "account-husband") {
		name = "신랑 한재호"
		onsideName = "신랑측"
		accounts = [
			{ bank: '농협', holder: '정우원', number: '811016-52-099207' },
			{ bank: '신한은행', holder: '한재호', number: '110-534-833811' }		
		];
		
	} else if (String(accountSex[0]) === "account-wife") {
		name = "신부 이주희"
		onsideName = "신부측"
		accounts = [
			{ bank: '하나은행', holder: '이종국', number: '161-19-090141' },
			{ bank: '농협', holder: '정다교', number: '815074-56-101-001' },
			{ bank: '카카오뱅크', holder: '이주희', number: '3333-06-6845-889' }
		];
	}
	// from this time, rendering HTML
	let wholeSection = document.createElement('div');

    // Create h1 element
    let title = document.createElement('h1');

    // Create and append span
    let span = document.createElement('span');
    span.textContent = name;
    title.appendChild(span);

    // Create and append strong element
    let strong = document.createElement('strong');
    let divT1 = document.createElement('div');
    divT1.textContent = onsideName
    strong.appendChild(divT1);
    strong.appendChild(document.createTextNode(' 마음 전하실 곳'));
    title.appendChild(strong);

    // Append h1 to the outer div
    wholeSection.appendChild(title);

    // Create ul element
    let accountList = document.createElement('ul');

    // Account information
    // accounts = [
    //     { bank: '하나은행', holder: '이종국', number: '161-19-090141' },
    //     { bank: '농협', holder: '정다교', number: '815074-56-101-001' },
    //     { bank: '카카오뱅크', holder: '이주희', number: '3333-06-6845-889' }
    // ];

    // Iterate over account info to create list items
    accounts.forEach((account) => {
        let li = document.createElement('li');
        li.classList.add("modal-li")
        
        // Create the name div
        let nameDiv = document.createElement('div');
        nameDiv.textContent = `(${account.bank} / 예금주 : ${account.holder})`;
        li.appendChild(nameDiv);

        // Create the account number div
        let accNumberDiv = document.createElement('div');

        let spanAcc = document.createElement('span');
        spanAcc.textContent = account.number;
        accNumberDiv.appendChild(spanAcc);

        // Create the copy button
        let pCopy = document.createElement('p');
        let aCopy = document.createElement('a');
        aCopy.classList.add("copy-btn");
        aCopy.textContent = '복사하기';
		aCopy.addEventListener('click', (event) => {
			event.preventDefault();
			setAccountNumber(account.number)
		})
        // aCopy.setAttribute('onclick', `set_account_number('${account.number}');`);
        pCopy.appendChild(aCopy);
        accNumberDiv.appendChild(pCopy);

        // Append account number div to the list item
        li.appendChild(accNumberDiv);

        // Append list item to the ul
        accountList.appendChild(li);
    });

    // Append the account list to the outer div
    wholeSection.appendChild(accountList);

    // Append the whole section to the document body or a specific container
    modalContents.appendChild(wholeSection);

}

function setAccountNumber (accountNumber) {
    navigator.clipboard.writeText(accountNumber).then(() => {
        alert('계좌번호 ' + accountNumber + ' 가 복사 되었습니다! ');
    });
}


const modalFunc = () => {
	const modal = document.querySelector(".modal");


	const modalShowBtn = document.querySelectorAll(".modal-show-btn")
	const modalCloseBtn = document.querySelector(".modal-close-btn")

	
	const toggleModal = (event) => {
		modal.classList.toggle("show");

		const eventTarget = event.target.classList.value
		console.log(eventTarget)

		if (!event) {
			modalHTMLShowFunc(null);
			return;
		}

		modalHTMLShowFunc(eventTarget);

	}

	// so bothering.. it just had only 2..
	modalShowBtn[0].addEventListener("click", toggleModal);
	modalShowBtn[1].addEventListener("click", toggleModal);

	modalCloseBtn.addEventListener("click", toggleModal);


	window.addEventListener("click", function (event) {
		// 모달의 검은색 배경 부분이 클릭된 경우 닫히도록 하는 코드
		if (event.target === modal) {
		  toggleModal();
		}
	});
}


const pageLoadFunc = () => {

	document.addEventListener("DOMContentLoaded", () => {
		observeFunc();
		modalFunc();
	});

	window.addEventListener('load', () => {
		
		const spinnerClass = document.querySelector('.loading-spinner');
		const containerClass = document.querySelector('.container');

		spinnerClass.classList.add('fade-out');
		containerClass.classList.add('fade-out');

		setTimeout(() => {

			spinnerClass.style.display = 'none';
			// containerId.classList.add('fade-in');
			containerClass.style.display = 'block';
			containerClass.classList.replace('fade-out', 'fade-in');

		}, 1000)
		// loading end start
		
	})
	
}

// start init

const init = () => {
	pageLoadFunc();
	setInterval(dDayLeftShow, 1000);
}

init();