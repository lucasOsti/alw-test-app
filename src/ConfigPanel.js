import React, { useState } from "react";
import { Button, Form, Offcanvas } from "react-bootstrap";

const ConfigPanel = ({
    rootLocationId,
    setRootLocationId,
    startingLocationId,
    setStartingLocationId,
    windowMode,
    setWindowMode,
    multipleSelection,
    setMultipleSelection,
    language,
    setLanguage
}) => {
    const [isConfigPanelVisible, setIsConfigPanelVisible] = useState(false);

    const handleClose = () => setIsConfigPanelVisible(false);
    const handleShow = () => setIsConfigPanelVisible(true);

    return (
        <>
            <Button className="app-container__config-btn" variant="primary" onClick={handleShow}>
                Config
            </Button>
            
            <Offcanvas show={isConfigPanelVisible} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Image Picker Config</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Form.Label>Root Location Id:</Form.Label>
                    <Form.Group className="mb-3">
                        <Form.Control
                            className="root-location-id-input"
                            type="number"
                            defaultValue={rootLocationId}
                            onChange={({ currentTarget }) =>
                                setRootLocationId(parseInt(currentTarget.value))
                            }
                            size="sm"
                        />
                    </Form.Group>
                    <Form.Label>Starting Location Id:</Form.Label>
                    <Form.Group className="mb-3">
                        <Form.Control
                            className="root-location-id-input"
                            type="number"
                            defaultValue={startingLocationId}
                            onChange={({ currentTarget }) =>
                                setStartingLocationId(parseInt(currentTarget.value))
                            }
                            size="sm"
                        />
                    </Form.Group>
                    <Form.Label>Language:</Form.Label>
                    <Form.Group className="mb-3">
                        <Form.Select aria-label="Default select example" value={language} onChange={({ currentTarget }) => {
                            setLanguage(currentTarget.value)
                        }}>
                            <option value="en">En</option>
                            <option value="es">Es</option>
                            <option value="fr">Fr</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Check
                            type="switch"
                            id="window-mode-switch"
                            label="Window Mode"
                            checked={windowMode}
                            onChange={({ target }) => setWindowMode(target.checked)}
                        />
                        <Form.Check
                            type="switch"
                            id="multiple-switch"
                            label="Multiple selection"
                            checked={multipleSelection}
                            onChange={({ target }) => setMultipleSelection(target.checked)}
                        />
                    </Form.Group>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}

export default ConfigPanel;