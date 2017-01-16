'use strict';

import React, { Component } from 'react';
import Rating from 'react-rating';
import styles from '../styles';
import Base64Image from './Base64Image';

class RecipeSummary extends Component {
    constructor(props) {
        super(props);

        this.cook = this.cook.bind(this);
        this.edit = this.edit.bind(this);
    }

    cook() {
        this.props.cookRecipe(this.props.recipe);
    }

    edit() {
        this.props.editRecipe(this.props.recipe);
    }

    render() {
        var isPublicMarkup = (<span className="label label-success">public</span>);
        if (!this.props.recipe.isPublic) {
            isPublicMarkup = (<span className="label label-warning">private</span>);
        }

        return (
            <tr>
                <td style={styles.recipeSummaryTd}>{this.props.recipe.title}</td>
                <td style={styles.recipeSummaryTd}>{isPublicMarkup}</td>
                <td style={styles.recipeSummaryTd}><Base64Image data={this.props.recipe.image} /></td>
                <td style={styles.recipeSummaryTd} className="ratingTD">
                    <Rating initialRate={this.props.recipe.rating}
                        empty={'glyphicon glyphicon-star-empty'}
                        full={'glyphicon glyphicon-star'}
                        />
                </td>
                <td style={styles.recipeSummaryTd}>
                    <button type="button" className="btn btn-default" onClick={this.cook}>
                        <span className="glyphicon glyphicon-play-circle"></span>Cook
                    </button>
                </td>
                <td style={styles.recipeSummaryTd}>
                    {
                        (this.props.recipe.userId == this.props.userId) &&
                        <button type="button" className="btn btn-default" onClick={this.edit}>
                            <span className="glyphicon glyphicon-pencil"></span>Edit
                        </button>
                    }
                </td>
            </tr>
        );
    }
}

export default RecipeSummary;