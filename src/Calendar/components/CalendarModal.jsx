import { addHours, differenceInHours } from "date-fns/esm";
import { useMemo, useState } from "react";
import Modal from "react-modal";
import DatePicker,{registerLocale} from "react-datepicker";
import Swal from "sweetalert2";


import 'sweetalert2/dist/sweetalert2.min.css';

import es from 'date-fns/locale/es';
import "react-datepicker/dist/react-datepicker.css";
import { differenceInCalendarDays, differenceInSeconds } from "date-fns";

registerLocale('es', es);


const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: '50%',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};


// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root');


export const CalendarModal = () => {

    const [isOpen, setIsOpen] = useState(true);
    const [formSubmited, setFormSubmited] = useState(false);
    
    const [formValues, setformValues] = useState({
        title:"Mario",
        notes:"Magdaleno",
        start: new Date(),
        end: addHours(new Date(),2)
    });

   const titleClass= useMemo(() => {
        if(!formSubmited) return '';

        return ( formValues.title.length>0) 
            ? ''
            : 'is-invalid'

    }, [formValues.title,formSubmited])

    const onInputChange = ({target})=>{
        setformValues({
            ...formValues,
            [target.name]:target.value
        });
    };
    
    const onDateChange = (event,changing)=>{
        setformValues({
            ...formValues,
            [changing]:event
        });
    };


    const onCloseModal = () => {
        setIsOpen(false);
    }

    const onSubmit=(event)=>{
        event.preventDefault();

        setFormSubmited(true);

        const difference = differenceInSeconds(formValues.end,formValues.start);
        if(difference<=0 || isNaN(difference)){
            Swal.fire('Fechas incorrectas','Revisar las fechas ingresadas','error');
            return;
        }

        if (formValues.title.length<=0) return;

        //TODO:
            //cerrar modal
            // remover errores en pantalla

    }


    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onCloseModal}
            style={customStyles}
            className="modal"
            overlayClassName="modal-fondo"
            closeTimeoutMS={200}
        >
            <h1> Nuevo evento </h1>
            <hr />
            <form className="container" onSubmit={onSubmit}>

                <div className="form-group mb-2">
                    <label>Fecha y hora inicio</label>
                    <DatePicker
                        selected={formValues.start}
                        className="form-control"
                        onChange={(event)=>onDateChange(event,'start')}
                        dateFormat="Pp"   
                        showTimeSelect
                        locale={es}
                        timeCaption="Hora"
                    />
                </div>

                <div className="form-group mb-2">
                    <label>Fecha y hora fin</label>
                    <DatePicker
                        minDate={formValues.start}
                        selected={formValues.end}
                        className="form-control"
                        onChange={(event)=>onDateChange(event,'end')}
                        dateFormat="Pp"
                        showTimeSelect
                        locale={es}
                        timeCaption="Hora"
                    />
                </div>

                <hr />
                <div className="form-group mb-2">
                    <label>Titulo y notas</label>
                    <input
                        type="text"
                        className={`form-control ${titleClass}`}
                        placeholder="Título del evento"
                        name="title"
                        autoComplete="off"
                        value={formValues.title}
                        onChange={onInputChange}
                    />
                    <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
                </div>

                <div className="form-group mb-2">
                    <textarea
                        type="text"
                        className="form-control"
                        placeholder="Notas"
                        rows="5"
                        name="notes"
                        value={formValues.notes}
                        onChange={onInputChange}
                    ></textarea>
                    <small id="emailHelp" className="form-text text-muted">Información adicional</small>
                </div>

                <button
                    type="submit"
                    className="btn btn-outline-primary btn-block"
                >
                    <i className="far fa-save"></i>
                    <span> Guardar</span>
                </button>

            </form>
        </Modal>
    )
}
