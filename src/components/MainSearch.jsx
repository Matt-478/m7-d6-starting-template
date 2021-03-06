import React, { useState } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import JobResult from "./JobResult";
import uniqid from "uniqid";
import { Link } from "react-router-dom";
import { fetchJobs } from "../store/actions";
import { useSelector, useDispatch } from "react-redux";

// const mapDispatchToProps = (dispatch) => ({
//   fetchJobs: (baseEndpoint, query) => dispatch(fetchJobs(baseEndpoint, query)),
// });


const MainSearch = () => {

  const [query, setQuery] = useState("")

  const jobs = useSelector(state => state.jobs)
  // previously forgot to get redux store state.jobs 

  const dispatch = useDispatch()

  const baseEndpoint = "https://strive-jobs-api.herokuapp.com/jobs?search=";

  const handleChange = (e) => {
    setQuery( e.target.value );
    //setQuery({ query: e.target.value });
    //setQuery is going to set the value of query so, there's no need to call it again
    // and the {} braces are making an object which also doesn't help
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await  dispatch(fetchJobs(baseEndpoint, query))
  };

    return (
      <Container>
        <Row>
          <Col xs={10} className="mx-auto my-3">
            <h1>Remote Jobs Search</h1>
            <Link to="/favourites" className="btn btn-primary">
              Favourites
            </Link>
          </Col>
          <Col xs={10} className="mx-auto">
            <Form onSubmit={handleSubmit}>
              <Form.Control
                type="search"
                value={query}
                onChange={handleChange}
                placeholder="type and press Enter"
              />
            </Form>
          </Col>
          <Col xs={10} className="mx-auto mb-5">
            {
              jobs.elements.map((data) => 
               <JobResult key={uniqid()}  data={data} />
              )
            } 
          </Col>
        </Row>
      </Container>
    );
} 

export default MainSearch

             /* {this.jobs.elements.map((jobData) => (
          //   // {jobs.elements.map((jobData) => ( */
          //     <JobResult key={uniqid()} data={jobs} /> */}
            // ))}
