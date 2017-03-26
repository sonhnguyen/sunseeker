import React, { Component } from 'react'
import Avatar from 'material-ui/Avatar'
import {Card, CardHeader, CardText} from 'material-ui/Card'
import {lightGreenA700, red700,grey600, grey50, transparent} from 'material-ui/styles/colors'
import Divider from 'material-ui/Divider'
import {List, ListItem} from 'material-ui/List'
import Moment from 'react-moment'

class ResultList extends Component {

    matchScore = (teamName, match) => {
        if(match.teama.toLowerCase() === teamName && match.scorea && match.scoreb)
            return `${match.scorea} - ${match.scoreb}`;
        else if (match.teamb.toLowerCase() === teamName && match.scorea && match.scoreb)
            return `${match.scoreb} - ${match.scorea}`;
        else {
            return 'No Information';
        }
    };

    render () {
        const { resultList } = this.props || [];
        const { teamName } = this.props;
        console.log(resultList);

        return (
            <Card style={{ 'marginTop': '10px'}}>
                <CardHeader title="Matches History" actAsExpander onClick={this.props.getRecent} style={{ backgroundColor: grey600 }} titleColor={grey50} showExpandableButton={true}/>
                <CardText expandable={true}>
                    <List>
                        {
                            resultList ?
                                resultList.map(groupMatch =>
                                    <div className="groupMatch">
                                        {
                                            groupMatch ?
                                                groupMatch.matches.map(match =>
                                                    <div key={resultList.indexOf(match)} >
                                                        <ListItem
                                                            primaryText={match.matchname}
                                                            leftAvatar={
                                                                match.winner
                                                                    ?
                                                                        <Avatar color={ match.winner.toLowerCase() !== teamName ? lightGreenA700:red700}
                                                                                backgroundColor={transparent}
                                                                                style={{left: 8}}>
                                                                            {match.winner.toLowerCase() !== teamName? "W":"L"}
                                                                        </Avatar>
                                                                    :
                                                                        ''
                                                            }
                                                            rightAvatar={
                                                                <p>
                                                                    {this.matchScore(teamName, match)}
                                                                </p>
                                                            }
                                                            secondaryText={
                                                                <div>
                                                                    <Moment fromNow>
                                                                        {match.time}
                                                                    </Moment>
                                                                </div>}
                                                        />

                                                        <Divider inset={true} />
                                                    </div>
                                                )
                                            : ''
                                        }
                                    </div>
                                )
                                : ''
                        }
                    </List>
                </CardText>
            </Card>
        )
    }
}

export default ResultList
