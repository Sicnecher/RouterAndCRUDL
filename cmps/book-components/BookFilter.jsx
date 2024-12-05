// export default function BookFilter() {
//   function handleChange({ target }) {
//     let { value, name = field } = target;
//     switch (target.type) {
//       case "range":
//       case "number":
//         value = +target.value;
//         break;
//       case "checkbox":
//         value = target.checked;
//         break;
//     }
//   }
//   return (
//     <section className="filter-form-container">
//         <h2>Filter</h2>
//       <form>
//         <section key="1">
//           <label>Name: </label>
//           <input type="text" />
//         </section>
//         <section key="2">
//           <label>Price: </label>
//           <input type="text" />
//         </section>
//       </form>
//     </section>
//   );
// }


import { bookService } from "../../services/book.service.js"
import { debounce } from "../../services/util.service.js"

const { useState, useEffect, useRef } = React

export default function BookFilter({ defaultFilter, onSetFilter }) {

    const [filterByToEdit, setFilterByToEdit] = useState(defaultFilter)
    const onSetFilterDebounce = useRef(debounce(onSetFilter)).current

    useEffect(() => {
        onSetFilterDebounce(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        let { value, name: field } = target
        switch (target.type) {
            case 'range':
            case 'number':
                value = +target.value
                break
            case 'checkbox':
                value = target.checked
                break
        }
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
    }

    // function handleTxtChange(ev) {
    //     setFilterByToEdit(filter => ({ ...filter, txt: ev.target.value }))
    // }

    // function handlepriceChange(ev) {
    //     setFilterByToEdit(filter => ({ ...filter, price: +ev.target.value }))
    // }

    function onSubmitFilter(ev) {
        ev.preventDefault()
        onSetFilter(filterByToEdit)
    }

    const { name, price } = filterByToEdit
    return (
        <section className="car-filter">
            <h2>Filter Our Cars</h2>
            <form onSubmit={onSubmitFilter}>
                <label htmlFor="name">Name: </label>
                <input value={name} onChange={handleChange} type="text" name="name" id="name" />

                <label htmlFor="price">Price: </label>
                <input value={price} onChange={handleChange} type="number" name="price" id="price" />

                <button>Submit</button>
            </form>
        </section>
    )
}
