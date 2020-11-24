import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../App.css";
import "./Table.css"

class Table extends Component {
	render () {
        return (
            <div id="resp-table">
                <div id="resp-table-caption">
                    <span>{this.props.title}</span>
                </div>

                <div id="resp-table-header">
                    {
                        this.props.cols.map(i => {
                            return <span key={i} className="table-header-cell">{i}</span>
                        })
                    }
                </div>

                <div className="resp-table-body">
                    {
                        
                        this.props.data.map(row => {
                            
                            return (
                                <div key={row.id} className="resp-table-row">
                                    {
                                        Object.keys(row).map((keyName, i) => {
                                            if(keyName !== "id") {
                                                if(keyName === "actions") {
                                                    return (
                                                        <span key={"actions_" + row.id} className="table-body-cell">
                                                            {
                                                                row.actions.map(action => {
                                                                    switch(action) {
                                                                        case "add":
                                                                            return <button className="btn btn-primary" key={action + row.id}>Add {this.props.property}</button>
                                                                        case "edit":
                                                                            return <button className="btn btn-primary" key={action + row.id}>Edit {this.props.property}</button>
                                                                        case "remove":
                                                                            return <button className="btn btn-secondary" key={action + row.id}>Remove {this.props.property}</button>
                                                                        case "select":
                                                                            return (
                                                                                <Link key={action + row.id} to={`/${this.props.property}/${row.id}`}>
                                                                                    <button className="btn btn-primary">Select {this.props.property}</button>
                                                                                </Link>
                                                                                )
                                                                        default:
                                                                            return null;
                                                                    }
                                                                })
                                                            }
                                                        </span>
                                                    );
                                                }
                                                else {
                                                    return <span key={row[keyName] + "_" + row.id} className="table-body-cell">{row[keyName]}</span>
                                                }
                                            }
                                            return null;
                                        })
                                    }      
                                </div>
                            )
                        }) 
                    }
                </div>

                <div id="resp-table-footer">
                    {
                        this.props.cols.map(i => {
                            return  <span key={i + "_footer"} className="table-footer-cell"></span>
                        })
                    }
                   
                </div>
            </div>
        );
    }
}
export default Table;
