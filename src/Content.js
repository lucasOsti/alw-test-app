import React, { useState } from "react";
import { Button, Container, Card, Col, Row } from "react-bootstrap";

import ConfigPanel from "./ConfigPanel";
import AlwWrapper from "./AlwWrapper";

const Content = () => {
    const [showImagePicker, setShowImagePicker] = useState(false);
    const [selectedData, setSelectedData] = useState([]);

    const [rootLocationId, setRootLocationId] = useState(43);
    const [startingLocationId, setStartingLocationId] = useState(43);
    const [windowMode, setWindowMode] = useState(true);
    const [multipleSelection, setMultipleSelection] = useState(false);
    const [language, setLanguage] = useState('en');
    const [clientId, setClientId] = useState("");
    const [clientSecret, setClientSecret] = useState("");
    const [instanceUrl, setInstanceUrl] = useState("");

    const openImagePicker = ({ currentTarget }) => {
        setClientId(currentTarget.dataset.clientId);
        setClientSecret(currentTarget.dataset.clientSecret);
        setInstanceUrl(currentTarget.dataset.instanceUrl);
        setShowImagePicker(true);
    };
    const onConfirm = (data) => {
        setShowImagePicker(false);
        setSelectedData(data);
    };
    const onCancel = () => {
        setShowImagePicker(false);
    };

    const renderImages = () => {
        if (!selectedData.length) {
            return null;
        }

        return selectedData.map((contentData) => {
            const { field } =  contentData.ContentInfo.Content.CurrentVersion.Version.Fields;
            const imageField = field.find((fieldData) => fieldData.fieldDefinitionIdentifier === 'asset' && fieldData.fieldTypeIdentifier === 'ezimage');
            const titleField = field.find((fieldData) => fieldData.fieldDefinitionIdentifier === 'title');

            return (
                <div className="app-container__result-img-container">
                    <img className="app-container__result-img" src={`${instanceUrl}/var/site/storage/images${imageField.fieldValue.path}`} alt="img" />
                    <div className="app-container__result-img-name">{ titleField.fieldValue }</div>
                </div>
            )
        });
    }

    return (
        <Container className="app-container__content" fluid>
            <div className={`image-picker-tab ${ showImagePicker && "image-picker-tab--showed"}`}>
            {showImagePicker && (
                <AlwWrapper
                    instanceUrl={instanceUrl}
                    clientId={clientId}
                    clientSecret={clientSecret}
                    rootLocationId={rootLocationId}
                    startingLocationId={startingLocationId}
                    windowMode={windowMode}
                    multiple={multipleSelection}
                    language={language}
                    onConfirm={onConfirm}
                    onCancel={onCancel}
                />
            )}
            </div>
            <Row>
                <Col xs  md lg={{ span: 1 }}>
                    <ConfigPanel
                        rootLocationId={rootLocationId}
                        windowMode={windowMode}
                        multipleSelection={multipleSelection}
                        setRootLocationId={setRootLocationId}
                        setWindowMode={setWindowMode}
                        setMultipleSelection={setMultipleSelection}
                        startingLocationId={startingLocationId}
                        setStartingLocationId={setStartingLocationId}
                        language={language}
                        setLanguage={setLanguage}
                    />
                </Col>
                <Col xs  md lg={{ span: 5 }}>
                    <Card className="app-container__content-card">
                        <Card.Body>
                            <Card.Title>Lorem ipsum dolor sit amet</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">Lorem ipsum</Card.Subtitle>
                            <Card.Text>
                                SLorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean sem quam, porttitor et sapien vitae, accumsan blandit est. Nulla ullamcorper quis ipsum eget mollis. In justo purus, facilisis a volutpat eu, mattis pretium ex. Etiam venenatis quam vel tempor condimentum. Quisque volutpat dui rhoncus, varius purus non, pharetra velit. Quisque pretium est nunc, vel venenatis dui eleifend finibus. Ut quis placerat nibh. Vestibulum rutrum, metus quis aliquet lobortis, purus sapien laoreet ante, fringilla iaculis nunc odio quis nunc. Proin ullamcorper orci ac metus pretium, sit amet ornare odio iaculis. Morbi porta odio erat, vitae pulvinar metus consequat eget.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs  md lg={{ span: 5 }}>
                    <Card className="app-container__content-card">
                        <Card.Header>Insert Results</Card.Header>
                        <Card.Body>
                            {renderImages()}
                        </Card.Body>
                        <Card.Footer>
                            <Button 
                                className="me-2" 
                                variant="success"
                                data-instance-url="{{ reader-instance-url }}"
                                data-client-id="{{ reader-client-id }}"
                                data-client-secret="{{ reader-client-secret }}"
                                onClick={openImagePicker}
                            >
                                Open (Reader)
                            </Button>
                            <Button
                                variant="warning"
                                data-instance-url="{{ editor-instance-url }}"
                                data-client-id="{{ editor-client-id }}"
                                data-client-secret="{{ editor-client-secret }}"
                                onClick={openImagePicker}
                            >
                                Open (Editor)
                            </Button>
                        </Card.Footer>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default Content;