export default class View {
	updateAndRender(newData){
		this._data = newData;
		const markup = this._generateMarkup(this._data);
		this._render(markup);
	}
	renderSpinner(){

	}
	_generateMarkup(newData);
	_render();
}
