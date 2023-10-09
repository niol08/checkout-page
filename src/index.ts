const sect: Element[] = Array.from(document.getElementsByClassName("content"))
const nav: Element[] = Array.from(document.getElementsByClassName("bg-scr"))
const nxtBtn: Element[] = Array.from(document.getElementsByClassName("next"))
const prevBtn: Element[] = Array.from(document.getElementsByClassName("prev"))
const plans: Element[] = Array.from(document.getElementsByClassName("img-prnt"))
const addOn: Element[] = Array.from(document.getElementsByClassName("add-ons"))
const plansChild: Element[] = Array.from(
  document.getElementsByClassName("img-sib")
)
const addOns: Element[] = Array.from(document.getElementsByClassName("add-ons"))
const affirm: Element = document.querySelector(".confirm")!
const newBtn: Element = document.querySelector<HTMLButtonElement>("#new-btn")!
const nameInput = document.querySelector<HTMLInputElement>("#name")!
const emailInput = document.querySelector<HTMLInputElement>("#email")!
const numInput = document.querySelector<HTMLInputElement>("#num")!
const check = document.querySelector<HTMLInputElement>("#checker")!
const nameErrorText = document.querySelector<HTMLSpanElement>(".name-error")!
const emailErrorText = document.querySelector<HTMLSpanElement>(".mail-error")!
const numErrorText = document.querySelector<HTMLSpanElement>(".num-error")!
const month = document.querySelector<HTMLSpanElement>("#month")!
const year = document.querySelector<HTMLSpanElement>("#year")!
const subType = document.querySelector<HTMLSpanElement>(".sub_type")!
const planType = document.querySelector<HTMLDivElement>(".plan_type")!
const xtras: Element = document.querySelector(".xtras")!
const revert = document.querySelector(".change")!
let currentIndex: number = 1
let perTotal = document.querySelector<HTMLSpanElement>(".per-total")!
let timeSwitchTotal =
  document.querySelector<HTMLSpanElement>(".time-switch-total")!
let partTotal = document.querySelector<HTMLSpanElement>(".numero")!
let numberTotal = document.querySelector<HTMLSpanElement>(".number-total")!
let trial = document.querySelector<HTMLSpanElement>(".trial")!
let arr: string[] = []
let sumTotal: number
let add: number = 0
let random: number = 0
const mailReg: RegExp =
  /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/
let checkStatus: boolean
let nameValidation: boolean = false
const emailValidation = (): boolean => {
  if (!mailReg.test(emailInput.value)) {
    return false
  }
  return true
}

const setPage = (): void => {
  sect.forEach((item: Element, index: number) => {
    if (item.classList.contains("block")) {
      item.classList.remove("block")
      item.classList.add("none")
    }
    if (item.classList.contains("flex")) {
      item.classList.remove("flex")
    }
    if (index + 1 === currentIndex) {
      item.classList.remove("none")
      item.classList.add("block")
    }
  })
}
const showNameError = () => {
  if (nameValidation === false) {
    nameInput.classList.add("error")
    nameErrorText.textContent = "This field cannot be empty."
  }
}

const removeNameError = () => {
  if (nameValidation === true && nameInput.classList.contains("error")) {
    nameInput.classList.remove("error")
    nameErrorText.textContent = ""
  }
}
const removeNumError = () => {
  if (nameInput.value) {
    numInput.className = "input"
    numErrorText.textContent = ""
  }
}

const showMailError = () => {
  if (emailInput.validity.valueMissing) {
    emailErrorText.textContent = "This field cannot be empty."
  } else if (emailInput.validity.typeMismatch) {
    emailErrorText.textContent = "Enter a valid email."
  }
  emailInput.className = "input error"
}

const setBgcolor = (): void => {
  nav.forEach((item: Element, index: number) => {
    if (item.classList.contains("num-col")) {
      item.classList.remove("num-col")
    }
    if (currentIndex - 1 === index) {
      item.classList.add("num-col")
    }
  })
}

const dynamicAddPlan = (item: Element) => {
  let tag: string = item.querySelector(".tag")?.textContent!
  let num: any = item.querySelector(".number")?.textContent!
  let tSwitch: string = item.querySelector(".time-switch")?.textContent!
  let newTag = planType.querySelector(".billing_type")!
  let newNum = planType.querySelector(".numero")!
  let newtSwitch = planType.querySelector(".plan_switch")!
  newTag.textContent = tag
  newNum.textContent = num
  newtSwitch.textContent = tSwitch
}

nxtBtn.forEach((item: Element) => {
  item.addEventListener("click", () => {
    if (arr.length == 0) {
      trial.textContent = partTotal?.textContent
    } else if (arr.length > 0) {
      calcTotal()
      trial.textContent = (random + parseInt(partTotal.textContent!)).toString()
      random = 0
    }

    let mail: boolean = emailValidation()
    let num: boolean
    if (numInput.value !== "" || null) {
      num = true
    } else {
      num = false
    }
    if (nameValidation && mail && num) {
      currentIndex = currentIndex + 1
      setPage()
      setBgcolor()
    }
  })
})
prevBtn.forEach((item: Element) => {
  item.addEventListener("click", () => {
    currentIndex = currentIndex - 1
    setPage()
    setBgcolor()
  })
})
affirm.addEventListener("click", () => {
  currentIndex = 5
  setPage()
  let finalPage: Element = sect[sect.length - 1] as HTMLButtonElement
  finalPage.classList.add("flex")
})
document.addEventListener("DOMContentLoaded", () => {
  nav[0].classList.add("num-col")
  plans[0].classList.add("plans-active")
  const activePlan = document.querySelector<HTMLDivElement>(".plans-active")!
  dynamicAddPlan(activePlan)
  check.addEventListener("change", () => {
    dynamicAddPlan(activePlan)
  })
})
nameInput.addEventListener("input", () => {
  let myInput = nameInput.value

  if (myInput) {
    nameValidation = true
  } else {
    nameValidation = false
  }
})
nameInput.addEventListener("focusout", () => {
  showNameError()
})
nameInput.addEventListener("input", () => {
  removeNameError()
})

numInput.addEventListener("focusout", () => {
  if (!numInput.value) {
    numInput.className = "input error"
    numErrorText.textContent = "This field cannot be empty."
  }
})
numInput.addEventListener("input", () => {
  removeNumError()
})
emailInput.addEventListener("input", () => {
  if (emailInput.validity.valid) {
    emailErrorText.textContent = ""
    emailInput.className = "input"
  } else {
    showMailError()
  }
})
plans.forEach((div) => {
  div.addEventListener("click", (e: Event) => {
    const target = e.currentTarget as HTMLDivElement
    plans.forEach((item) => {
      if (item.classList.contains("plans-active")) {
        item.classList.remove("plans-active")
      }
    })
    target.className = "img-prnt plans-active"
    dynamicAddPlan(target)
    check.addEventListener("change", () => {
      dynamicAddPlan(target)
    })
  })
})
check.addEventListener("change", () => {
  addOn.forEach((item) => {
    if (item.classList.contains("active-addon")) {
      item.classList.remove("active-addon")
    }
  })
  checkStatus = check.checked
  xtras.innerHTML = " "
  arr = []
  let checks: NodeListOf<HTMLInputElement> =
    document.querySelectorAll("#check-box")!

  checks.forEach((item) => {
    item.checked = false
  })
  plansChild.forEach((item) => {
    const numeralDiv = item.querySelector(".number")!
    const numeral = item.querySelector(".number")?.textContent
    let timeSwitch = item.querySelector(".time-switch")
    if (checkStatus) {
      if (numeral) {
        let newNumeral: number = +numeral
        newNumeral = newNumeral * 10
        numeralDiv.textContent = newNumeral.toString()
        const mySpan = document.createElement("span")
        mySpan.classList.add("bonus")
        mySpan.textContent = "2 months free"
        item.appendChild(mySpan)
        year.className = "active"
        month.className = ""
        if (timeSwitch) {
          timeSwitch.textContent = "yr"
        }
      }
    } else {
      if (numeral) {
        let newNumeral: number = +numeral
        newNumeral = newNumeral / 10
        numeralDiv.textContent = newNumeral.toString()
        const mySpan = document.querySelector(".bonus")!
        item.removeChild(mySpan)
        month.className = "active"
        year.className = ""
        if (timeSwitch) {
          timeSwitch.textContent = "mo"
        }
      }
    }
    if (checkStatus) {
      subType.textContent = "yearly"
      perTotal.textContent = "year"
      timeSwitchTotal.textContent = "yr"
    } else {
      subType.textContent = "monthly"
      perTotal.textContent = "month"
      timeSwitchTotal.textContent = "mo"
    }
  })
  addOns.forEach((item) => {
    const numeralDiv = item.querySelector(".add-on-price")!
    const numeral = item.querySelector(".add-on-price")?.textContent
    let timeSwitch = item.querySelector(".time-switch")
    if (checkStatus) {
      if (numeral) {
        let newNumeral: number = +numeral
        newNumeral = newNumeral * 10
        numeralDiv.textContent = newNumeral.toString()
        if (timeSwitch) {
          timeSwitch.textContent = "yr"
        }
      }
    } else {
      if (numeral) {
        let newNumeral: number = +numeral
        newNumeral = newNumeral / 10
        numeralDiv.textContent = newNumeral.toString()
        if (timeSwitch) {
          timeSwitch.textContent = "mo"
        }
      }
    }
  })
})
revert.addEventListener("click", () => {
  currentIndex = currentIndex - 2
  setPage()
  setBgcolor()
})
addOn.forEach((item, index) => {
  item.addEventListener("change", () => {
    let checkk = item.querySelector<HTMLInputElement>("#check-box")!
    if (checkk?.checked) {
      item.classList.add("active-addon")
      let tag = item.querySelector<HTMLDivElement>(".tag")?.textContent!
      let price =
        item.querySelector<HTMLSpanElement>(".add-on-price")?.textContent!
      let timing =
        item.querySelector<HTMLSpanElement>(".time-switch")?.textContent!
      const element = document.createElement("div")
      element.classList.add("extra-style")
      element.innerHTML = `<div class="xtra-style">
            <div class="xtra-service">${tag}</div>
            <div class="xtra-pricing">
              +$<span class="xtra-num">${price}</span>/<span class="xtra-time"
                >${timing}</span
              >
            </div>
          </div>`
      let myId = index.toString()
      element.classList.add(myId)
      xtras.appendChild(element)
      let xtraNum: string = element.querySelector(".xtra-num")?.textContent!
      arr.push(xtraNum)
    } else {
      if (item.classList.contains("active-addon")) {
        item.classList.remove("active-addon")
      }
      let id: string = index.toString()
      let element = Array.from(xtras.getElementsByClassName(id))
      if (id == element[0].classList[1]) {
        xtras.removeChild(element[0])
      }
      let popNum = element[0].querySelector(".xtra-num")?.textContent!
      let numIndex = arr.indexOf(popNum)
      arr.splice(numIndex, 1)
    }
  })
})
const calcTotal = () => {
  arr.forEach((item) => {
    random = random + parseInt(item)
  })
}
