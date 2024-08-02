import { PRODUCT_NAME } from "@env";

export const APP_NAME = `${PRODUCT_NAME}`;
const _APP_NAME = APP_NAME.toLowerCase().replace(" ", "-");
export const APP_TOAST = `${_APP_NAME}-APP-TOAST`;
export const imageTransition = 200; 
export const imageLoadBlur = '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj['
export const imageVideoBlur = 'L04xlD009Fay%MIUxuj[9Fxut7IU'


export const APP_QUIZZES = [
  {
    id: 1,
    title: "Math Quiz",
    description: "Test your knowledge of basic math equations.",
    questions: [
      {
        id: 1,
        question: "Solve the equation: \(2x + 3 = 7\).",
        options: ["2", "3", "4"],
        correctOption: "2",
        image: "https://miro.medium.com/v2/resize:fit:600/1*lLiSm1cRPXlNFxVo-R8JZQ.jpeg" // Image URL or local path
      },
      {
        id: 2,
        question: "What is the area of a circle with radius \(r\)?",
        options: ["\(\pi r^2\)", "\(\frac{2\pi r}{h}\)", "\(\frac{\pi r^2}{2}\)"],
        correctOption: "\(\pi r^2\)",
        image: "https://media.geeksforgeeks.org/wp-content/uploads/20220309172050/circleandbasicterms-300x228.png" // Image URL or local path
      }
    ]
  },
  {
    id: 2,
    title: "Chemistry Quiz",
    description: "Test your knowledge of chemical formulas.",
    questions: [
      {
        id: 1,
        question: "What is the chemical formula for water?",
        options: ["H2O", "O2", "CO2"],
        correctOption: "H2O",
        image: "https://images.pexels.com/photos/40784/drops-of-water-water-nature-liquid-40784.jpeg?cs=srgb&dl=pexels-pixabay-40784.jpg&fm=jpg" // Image URL or local path
      },
      {
        id: 2,
        question: "Which formula represents hydrochloric acid?",
        options: ["HCl", "NaCl", "H2SO4"],
        correctOption: "HCl",
        image: "https://www.worksheetsplanet.com/wp-content/uploads/2022/12/What-is-an-acid.jpg" // Image URL or local path
      }
    ]
  }
]