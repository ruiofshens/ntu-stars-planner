import React, { useContext, useState } from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Spinner from 'react-bootstrap/Spinner';
import Container from 'react-bootstrap/Container';

import PlanDetails from '../PlanDetails';
import { SavedPlansContext } from '../../contexts/SavedPlansContext';
import { CurrentPlanContext } from '../../contexts/CurrentPlanContext';
import { CoursesContext } from '../../contexts/CoursesContext';

import { fetchVacanciesAndWaitlist } from '../../services/DataRetriever';

function SavedPlansOverview() {

    const { savedPlans, setSavedPlans } = useContext(SavedPlansContext);
    const { setCurrentPlan } = useContext(CurrentPlanContext);
    
    const { courses } = useContext(CoursesContext); // for checking if courses are loaded in already
    const [ chosenPlan, setChosenPlan ] = useState("-1");

    const [ loading, setLoading ] = useState(false);

    //Render saved plan only if it has been defined already and update current index
    const renderPlan = (value) => {
        if (courses.length === 0) { // courses not loaded in yet, cannot load saved plan
            alert("Loading in courses... Please try a few seconds later.");
            return;
        }
        if (savedPlans.plans[value]){
            setLoading(true);
            setSavedPlans({...savedPlans, currentIndex: value})
            const toLoad = savedPlans.plans[value];
            addVacanciesAndWaitlist(toLoad)
            .then(() => {
                // check if indexes still valid
                const unavailableIndexes = [];
                const courseCodes = [];
                toLoad.forEach(course => courseCodes.push(course.courseCode))
                courses.forEach(course => {
                    if (courseCodes.includes(course.courseCode)) {
                        const indexNo = toLoad.filter(savedCourse => savedCourse.courseCode === course.courseCode)[0].index.indexNo;
                        if (!course.indexes.some(index => index.indexNo === indexNo)) { // index no longer valid
                            unavailableIndexes.push({courseCode: course.courseCode, indexNo});
                        }
                    }
                })
                setCurrentPlan(toLoad);
                setChosenPlan(value);
                setLoading(false);
                if (unavailableIndexes.length !== 0) {
                    let unavailableStr = "";
                    unavailableIndexes.forEach(unavailable => {
                        unavailableStr += `${unavailable.courseCode}: ${unavailable.indexNo}\n`
                    })
                    alert(`The following index(es) are no longer available:\n${unavailableStr}`)
                }
            })            
        }
        else if (value === "-1") {
            setChosenPlan(value);
        } else {
            alert("Plan not defined yet!");
        }
    }

    const addVacanciesAndWaitlist = async (toLoad) => {
        const promiseArray = [];
        toLoad.forEach(course => {
            promiseArray.push(new Promise((resolve, reject) => {
                fetchVacanciesAndWaitlist(course.courseCode)
                .then((indexes) => {
                    if (indexes.length !== 0) { // 10am to 10pm
                        const thisIndex = indexes.filter(index => index.indexNo === course.index.indexNo)[0];
                        course.index.vacancies = thisIndex.vacancies;
                        course.index.waitlistLength = thisIndex.waitlistLength;
                    } else { // 10pm to 10am
                        course.index.vacancies = "NA";
                        course.index.waitlistLength = "NA";
                    }
                })
                .then(() => resolve())
                .catch((e) => console.log(e));
            }));
        });
        await Promise.all(promiseArray);
    }

    return (
        <>
            <Row>
                <Col xs={12} lg={1} className="d-flex flex-column align-items-center">
                Load Plan:
                    <Row className="px-1 pb-4 my-1 align-items-center">
                        <Form.Control 
                        size="sm" 
                        as="select" 
                        value={chosenPlan}
                        onChange={choice => renderPlan(choice.target.value)}
                        id="saved-plans-overview-load-plan">
                            <option value = {-1}>Choose Plan</option>
                            <option value = {0}>Plan 1</option>
                            <option value = {1}>Plan 2</option>
                            <option value = {2}>Plan 3</option>
                        </Form.Control>
                    </Row>
                </Col>
                <Col xs={12} lg={11}>
                    <PlanDetails/>
                </Col>
            </Row>
            <Modal show={loading} id="modal-loading-saved-plan">
                <Modal.Body>
                    <Container className="d-flex flex-column justify-content-center align-items-center">
                        <Spinner animation="grow" role="status" variant="secondary">
                            <span className="sr-only">Loading...</span>
                        </Spinner> 
                        <Row className="text-center pt-1">
                            Loading saved plan...
                        </Row>
                    </Container>
                </Modal.Body>
            </Modal>
        </>
    );
}
  
export default SavedPlansOverview;