import React, { Component } from 'react';



class Rank extends Component {
	constructor(props) {
		super(props);
		this.state = {
			emoji: ''
		}
	}

	componentDidMount() {
		this.genrateEmoji(this.props.entries)
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevProps.entries === this.props.entries && prevProps.name === this.props.name) {
			return null;
		}
		this.genrateEmoji(this.props.entries);
	}

	genrateEmoji = (entries) =>
	fetch(`https://p7yjyker1m.execute-api.us-east-1.amazonaws.com/rank?rank=${entries}`)
		.then(response => response.json())
		.then(data => this.setState({ emoji: data.input }))
		.catch(console.log)
	render() {
		return (
			<div>
				<div className='white f3'>
					{`${this.props.name}, your current entry count is...`}
				</div>
				<div className='white f1'>
					{`${this.props.entries}`}
				</div>
				<div className='white f3'>
					{`Rank Badge: ${this.state.emoji}`}
				</div>
			</div>
		);
	}
}

	


export default Rank;