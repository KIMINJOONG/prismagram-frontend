import React, { useState } from 'react';
import PropTypes from 'prop-types';
import useInput from '../../Hooks/useInput';
import PostPresenter from './PostPresenter';

const PostContainer = ({
    id, 
    user, 
    files, 
    likeCount, 
    isLiked, 
    comments, 
    createdAt
}) => {

}

PostContainer.propTypes = {
    id: PropTypes.string.isRequired, 
    user: PropTypes.shape({
        id: PropTypes.string.isRequired,
        avatar: PropTypes.string,
        username: PropTypes.string.isRequired
    }).isRequired, 
    files: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        url: PropTypes.string
    })).isRequired, 
    likeCount: PropTypes.number.isRequired, 
    isLiked: PropTypes.bool.isRequired, 
    comments: PropTypes.arrayOf(PropTypes.shape({
        id:PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        user: PropTypes.objectOf(PropTypes.shape({
            id: PropTypes.string.isRequired,
            username: PropTypes.string.isRequired
        })).isRequired
    })).isRequired, 
    createdAt: PropTypes.string
};

export default PostContainer;