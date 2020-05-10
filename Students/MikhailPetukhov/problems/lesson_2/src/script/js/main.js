class App {
    constructor(form) {
        this.form = null;
        this.items = [];
        this._init(form);
    }
    _init(form) {
        //инкапсулированный метод

        this.renderForm();
        // this.form = document.querySelector(form);
        // document.querySelector('#app').addEventListener('click', () => {
        //     this.addNewItem();
        // });
        // console.log('Form is ready');
    }

    renderForm() {
        let HOBBIES = ["Eat", "Sleep", "Netflix", "Gym"];

        let str = `
            <form action="#" id="app-form">
                <fieldset>
				`;

        // HOBBIES.forEach(el =>
        //     str += `<label class="my_label">
        //                  <input type="checkbox" name="Hobbies" data-hobbie="${el}"> ${el}
        //              </label>`
        // );


//Если закомментировать вот этот блок и заскомментировать предыдущий,
// то лейблы в форме "едут", приходится править стили
        str +=  `                
                    <label>
                        <input type="checkbox" name="Hobbies" data-hobbie="eat"> Eat
                    </label>
                    <label>
                        <input type="checkbox" name="Hobbies" data-hobbie="sleep"> Sleep
                    </label>
                    <label>
                        <input type="checkbox" name="Hobbies" data-hobbie="nflix"> Netflix
                    </label>
                    <label>
                         <input type="checkbox" name="Hobbies" data-hobbie="gym"> Gym
                    </label>`;
// Здесь блок заканчивается

        str +=  `
                </fieldset>
            </form>`;
        document.querySelector(".my-2").innerHTML = str;
    }

}


export default function () {
    let app = new App('#app-form')
}
