import React from "react";
import PropTypes from "prop-types";
import PubSub from "pubsub-js";
import TagList from "./TagList";

class FollowingTagList extends React.Component {
  constructor(props) {
    super(props);

    this.state = { followingTags: this.props.followingTags  };
  }

  componentWillMount() {
    this.token = PubSub.subscribe('TagFollowButton:onClick', () => {
      this.fetchTags();
    })
  }

  componentWillUnmount() {
    PubSub.unsubscribe(this.token);
  }

  render () {
    return (
      <TagList tags={this.state.followingTags} className="following-tag-list" />
    );
  }

  fetchTags() {
    $.ajax({
      url: '/api/following_tags.json',
      method: 'GET',
      success: (data) => {
        this.setState({ followingTags: data });
      }
    });
  }
}

FollowingTagList.propTypes = {
  followingTags: PropTypes.array.isRequired
};

export default FollowingTagList