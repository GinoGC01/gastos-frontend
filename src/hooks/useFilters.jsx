import { useState, useEffect} from 'react';

export function usePaginationFilters({gastos}) {
    const [gastosFiltered, setGastosFiltered] = useState([])

    const [gastosPagination, setGastosPagination] = useState([])
    const [currentPage, setCurrentPage] = useState(0)
    const [valor, setValor] = useState('')
    const ITEMS_PER_PAGE = 4

    const handleGastosFiltered = ({ titulo = '', categoria = '' }) => {
        const gastosFiltrados = gastos.filter(gasto => {
            const tituloMatch = !titulo || gasto.titulo.toLowerCase().includes(titulo.toLowerCase());
            const categoriaMatch = !categoria || gasto.categoria.toLowerCase().includes(categoria.toLowerCase());
            return tituloMatch || categoriaMatch;
        });
        setGastosFiltered(gastosFiltrados);
    }

    // Cuando cambia el valor del input, se filtran los gastos
    const handleChange = (e) => {
        const nuevoValor = e.target.value
        setValor(nuevoValor)

        handleGastosFiltered({
            titulo: nuevoValor,
            categoria: nuevoValor,
            pagado: nuevoValor
        })
    }

        // Se reinicia la paginación cada vez que se modifica el filtro
        useEffect(() => {
            setCurrentPage(0)
        }, [valor])
    
        // Paginación basada en gastos filtrados (si hay) o todos los gastos
        useEffect(() => {
            const data = gastosFiltered.length > 0 ? gastosFiltered : gastos
            if (data && data.length > 0) {
                const start = currentPage * ITEMS_PER_PAGE
                const end = start + ITEMS_PER_PAGE
                setGastosPagination(data.slice(start, end))
            }
        }, [gastos, gastosFiltered, currentPage])
    
        const handlePagination = (action) => {
            const data = gastosFiltered.length > 0 ? gastosFiltered : gastos
            if (action === 'next' && (currentPage + 1) * ITEMS_PER_PAGE < data.length) {
                setCurrentPage(prev => prev + 1)
            } else if (action === 'previous' && currentPage > 0) {
                setCurrentPage(prev => prev - 1)
            }
        }

  return (
    {
        handleChange,
        handlePagination,
        gastosPagination,
        gastosFiltered,
        valor,
        currentPage
    }
  )
}
