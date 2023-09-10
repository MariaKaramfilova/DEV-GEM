// eslint-disable-next-line no-unused-vars
import React from "react";
import "./Error.css";
import { Link } from "react-router-dom";

/**
 * The Error component displays an error message along with a link to go back to the home page.
 *
 * @param {Object} props - The props passed to the Error component.
 * @param {string} props.error - The error message to be displayed.
 * @returns {JSX.Element} - JSX representing the Error component.
 */

interface Props {
  error: string;
}
export default function Error({ error }: Props) {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <div className="error-template">
            <h1>Oops!</h1>
            <h4>{error}</h4>
            <div className="error-details">
              Sorry, an error has occurred, we cannot process your request!
            </div>
            <div className="error-actions">
              <Link to={"/home"} className="btn btn-primary btn-lg">
                <span className="glyphicon glyphicon-home"></span>
                Take Me Home{" "}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
