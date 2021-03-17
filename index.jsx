class ClickButton extends React.Component {
  constructor(props) {
      super(props);
      this.state = {class: "off", label: "Нажми"};
        
      this.press = this.press.bind(this);
        
      console.log("constructor");
  }
  componentWillReceiveProps(nextProps) {
      console.log("componentWillReceiveProps()");
  }
};
  let propsValues = {
    title: "Список группы",
    items: [
        "Сорокин", 
        "Никитин", 
        "Баранюк", 
        "Степанов", 
        "Имкенова", 
        "Уральсков"
    ]
  };
              
class Item extends React.Component {
    render() {
        return <li>{this.props.name}</li>;
    }
}
         
class SearchPlugin extends React.Component{
             
    constructor(props){
        super(props);
        this.onTextChanged = this.onTextChanged.bind(this);
    }
             
    onTextChanged(e){
        var text = e.target.value.trim();   // удаляем пробелы
        this.props.filter(text); // передаем введенный текст в родительский компонент
    }
             
    render() {
        return <input placeholder="Поиск" onChange={this.onTextChanged} />;
    }
}
                  
class ItemsList extends React.Component {
    constructor(props){
        super(props);
        this.state = { items: this.props.data.items};
                          
        this.filterList = this.filterList.bind(this);
    }

    componentDidMount(){
      propsValues.items.map(x => console.log(x));
    }
    
    componentDidUpdate(prevProps, prevState, snapshot){
      console.log("list updated");

    }

    filterList(text){
        let filteredList = this.props.data.items.filter(function(item){
            return item.toLowerCase().search(text.toLowerCase())!== -1;
        }); 
        this.setState({items: filteredList});
    }
              
    render() {
        return(
            <div>         
                <h2>{this.props.data.title}</h2>
                <SearchPlugin filter={this.filterList} />
                <ul>
                    {
                        this.state.items.map(function(item){
                            return <Item key={item} name={item} />
                        })
                    }
                </ul>
            </div>);
    }
}
          
ReactDOM.render(
    <ItemsList data={propsValues} />,
    document.getElementById("app")
)
