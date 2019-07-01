import React from "react";

import SelectRenderProps from "../Inputs/SelectRenderProps";

import { useBaseContainer } from "../../context/BaseContainer/base-container-context";

import "./ContainerModal.css";

const MODAL_STATE = {
  display: "block",
  flexDirection: "",
  boxSizing: "border-box"
};

export default function ContainerModal(props) {
  const { changeBaseSettings } = useBaseContainer();
  const [modalState, setModalState] = React.useState(MODAL_STATE);
  const { onClose } = props;

  const onSubmit = e => {
    e.preventDefault();
    changeBaseSettings(modalState);
    onClose();
  };

  const onChange = (value, name) => {
    return setModalState({
      ...modalState,
      [name]: value
    });
  };

  return (
    <div className="backdrop">
      <div className="modal">
        <div className="modal-header">
          <h1>Main window settings</h1>
          <button onClick={onClose}>&times;</button>
        </div>
        <div className="modal-body">
          <form onSubmit={onSubmit}>
            <SelectRenderProps
              defaultValue="block"
              propertyName="display"
              label="Display"
              defaultText="Display property for the element default is block"
              sendValue={onChange}
              render={() => (
                <>
                  <option value="flex">Flex</option>
                  <option value="block">Block</option>
                  <option value="inline-block">Inline Block</option>
                </>
              )}
            />
            <SelectRenderProps
              defaultValue="row"
              propertyName="flexDirection"
              label="Flex Direction"
              defaultText="Sets the direction of the flex container default is row"
              sendValue={onChange}
              render={() => (
                <>
                  <option value="column">Column</option>
                  <option value="row">Row</option>
                </>
              )}
            />
            <SelectRenderProps
              defaultValue="border-box"
              propertyName="boxSizing"
              label="Box Sizing"
              defaultText="Box Sizing for the container default will be border-box"
              sendValue={onChange}
              render={() => (
                <>
                  <option value="border-box">Border Box</option>
                  <option value="content-box">Content Box</option>
                </>
              )}
            />
            <div>
              <button type="submit">Set Properties</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
