import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchTeam } from '../actions'
import { fetchHistory } from '../actions'
import {Card, CardHeader, CardTitle, CardText} from 'material-ui/Card'
import {grey600, grey50} from 'material-ui/styles/colors'
import DatePicker from 'material-ui/DatePicker'
import F10KHistory from '../components/F10KHistory'
import TeamTwitter from '../components/TeamTwitter'
import ResultList from '../components/ResultList'
import NavigationBar from '../components/NavigationBar'
import { fetchTeamInfo } from '../actions'
import slugify from '../helper/slugify'

class TeamDetail extends Component {

    componentDidMount () {
        this.props.dispatch(fetchTeam(this.props.params.name));
        this.props.dispatch(fetchTeamInfo(slugify(this.props.params.name), "csgo"));
    }

    getRecent = () => {
    	this.props.dispatch(fetchHistory(this.props.params.name))
	};

    render () {
        const { teamDetail, teamHistory, teamInfo } = this.props;
		let teamSlug =  ""
		if (teamInfo && teamInfo.length > 0) {
			teamSlug = teamInfo[0].slug
		}
        const teamName = this.props.params.name.toLowerCase();

        return (
			<div className="TeamDetail">
				<NavigationBar/>
            	<div className="container">
                <div className="row">
					<div className="col-sm-6">
                    	<Card style={{ 'marginTop': '10px'}}>
                        	<CardTitle title={this.props.params.name} subtitle="Data from: " />
                        	<div>
                            	<CardText>
                                	<DatePicker hintText="From" autoOk defaultDate={new Date(Date.now() - 30 * 24 * 3600 * 1000)} container="inline" />
                                	<DatePicker hintText="To" autoOk defaultDate={new Date()} container="inline" />
                                	<Card initiallyExpanded>
                                    	<CardHeader title="Statistics" actAsExpander style={{ backgroundColor: grey600 }} titleColor={grey50} showExpandableButton={true}/>
                                    	<CardText expandable={true}>
                                        	<ul>
                                            	<li>Average kill: {teamDetail.avgkill}</li>
                                            	<li>Average death: {teamDetail.avgdeath}</li>
                                            	<li>Total kill: {teamDetail.totalkill}</li>
                                            	<li>Total death: {teamDetail.totaldeath}</li>
                                            	<li>Winrate: {teamDetail.winrate}</li>
                                            	<li>Average odds: {teamDetail.avgodds}</li>
                                        	</ul>
										</CardText>
                                	</Card>
									<F10KHistory teamName={teamName} f10kHistory={teamDetail.matches} />
									<ResultList teamName={teamName} resultList={teamHistory} getRecent={this.getRecent} />
                            	</CardText>
                        	</div>
                    	</Card>
					</div>
					<div className="col-sm-6">
						<TeamTwitter slug={teamSlug}/>
					</div>
                </div>
            	</div>
			</div>
        )
    }
}

const mapStateToProps = state => {
    return {
        teamDetail: state.team.teamDetail,
		teamHistory: state.team.teamHistory,
		teamInfo: state.team.teamInfo
    }
};

export default connect(mapStateToProps)(TeamDetail)
