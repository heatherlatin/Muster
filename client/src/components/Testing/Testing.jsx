import React, { Fragment } from "react";
import Modal from 'react-bootstrap/Modal';
import ModalDialog from 'react-bootstrap/ModalDialog';
import ModalHeader from 'react-bootstrap/ModalHeader';
import ModalTitle from 'react-bootstrap/ModalTitle';
import ModalBody from 'react-bootstrap/ModalBody';
import ModalFooter from 'react-bootstrap/ModalFooter';
import Button from 'react-bootstrap/Button';


function TestingThings() {
    return (
        <Fragment>
            <Modal>
            <ModalDialog>
                <ModalHeader>
                    <ModalTitle>Modal title</ModalTitle>
                </ModalHeader>
                <ModalBody style={{ 'maxHeight': 'calc(100vh - 210px)', 'overflowY': 'auto' }}>One fine body...
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ea eos deleniti unde assumenda ipsa, optio blanditiis provident quam, dignissimos impedit iste! Ipsam beatae ex facilis esse labore unde temporibus nihil.
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam reprehenderit, rem quaerat eum numquam commodi. Rerum, reprehenderit iusto! Ducimus eos pariatur harum quo rem eaque animi recusandae vitae labore facilis?
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore aperiam veniam, qui, dicta velit nostrum tempora voluptas blanditiis aliquam corrupti, quibusdam illo architecto mollitia. Tempora corporis fugiat necessitatibus aliquid ipsam.
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reiciendis sint facilis voluptatum unde dolor quis, iste quidem quod sed dolorum natus optio nesciunt aspernatur voluptate eveniet asperiores soluta earum? Facilis.
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reprehenderit nesciunt repudiandae dicta laudantium voluptatum ut mollitia, neque harum! Maiores in nisi incidunt voluptates magni voluptas ullam at voluptatem libero distinctio!
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Exercitationem quae nemo cum pariatur maiores fugiat fugit at veritatis perspiciatis itaque, sit ad nisi ullam est obcaecati, quo commodi assumenda? Magni.
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam, dolores. Voluptatibus, ducimus. Iusto officia distinctio aliquam temporibus ipsam cupiditate modi rem soluta veniam. Libero eveniet beatae necessitatibus ducimus voluptate accusantium.
                </ModalBody>
                <ModalFooter>
                    <Button>Close</Button>
                    <Button bsStyle="primary">Save changes</Button>
                </ModalFooter>
            </ModalDialog>
            </Modal>
        </Fragment>
    );
}
export default TestingThings;