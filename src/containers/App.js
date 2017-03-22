import React, { Component } from 'react'
import { connect } from 'react-redux'
import NavigationBar from '../components/NavigationBar'
import ListMatch from '../components/ListMatch'
import { fetchMatches } from '../actions'

class App extends Component {

    componentDidMount () {
        this.props.dispatch(fetchMatches({
            limit: 10,
            game: 'all'
        }));
    }

    render() {
        const { listMatches } = this.props;
        return (
            <div>
                <NavigationBar />
                <div className="container">
                    <ListMatch listMatches={ listMatches } />
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        listMatches: state.matches.listMatches
    }
};

export default connect(mapStateToProps)(App)

