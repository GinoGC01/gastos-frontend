import { useState, useEffect } from 'react';

export function usePaginationFilters({ gastos }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [estado, setEstado] = useState('');
  const [gastosFiltered, setGastosFiltered] = useState([]);
  const [gastosPagination, setGastosPagination] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const ITEMS_PER_PAGE = 4;

  const isFiltering = searchTerm !== '' || estado !== '';

  const handleGastosFiltered = ({ searchTerm = '', estado = '' }) => {
    if (!Array.isArray(gastos)) {
      setGastosFiltered([]);
      return;
    }

    const search = searchTerm.toLowerCase();

    const gastosFiltrados = gastos.filter(gasto => {
      const tituloMatch = gasto.titulo.toLowerCase().includes(search);
      const categoriaMatch = gasto.categoria.toLowerCase().includes(search);
      const estadoMatch = gasto.estado.toLowerCase() === estado.toLowerCase();

      const coincideTexto = search ? (tituloMatch || categoriaMatch) : true;
      const coincideEstado = estado ? estadoMatch : true;

      return coincideTexto && coincideEstado;
    });

    setGastosFiltered(gastosFiltrados);
  };

  useEffect(() => {
    handleGastosFiltered({ searchTerm, estado });
    setCurrentPage(0);
  }, [searchTerm, estado, gastos]);

  useEffect(() => {
    const data = isFiltering
      ? gastosFiltered
      : Array.isArray(gastos) ? gastos : [];

    const start = currentPage * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    setGastosPagination(data.slice(start, end));
  }, [gastos, gastosFiltered, currentPage, isFiltering]);

  const handlePagination = (action) => {
    const data = isFiltering
      ? gastosFiltered
      : Array.isArray(gastos) ? gastos : [];

    if (action === 'next' && (currentPage + 1) * ITEMS_PER_PAGE < data.length) {
      setCurrentPage(prev => prev + 1);
    } else if (action === 'previous' && currentPage > 0) {
      setCurrentPage(prev => prev - 1);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleEstadoChange = (e) => {
    setEstado(e.target.value);
  };

  const resetFilters = () => {
    setSearchTerm('');
    setEstado('');
  };

  return {
    handleSearchChange,
    handleEstadoChange,
    handlePagination,
    resetFilters,
    gastosPagination,
    currentPage,
    searchTerm,
    estado,
    gastosFiltered
  };
}
