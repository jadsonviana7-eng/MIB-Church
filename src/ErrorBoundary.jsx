import { Component } from 'react';

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-red-50 flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-center w-12 h-12 mx-auto bg-red-100 rounded-full">
              <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4v2m0 4v2M6.343 3H18.657a2 2 0 012 2v14a2 2 0 01-2 2H6.343a2 2 0 01-2-2V5a2 2 0 012-2z" />
              </svg>
            </div>
            <h1 className="mt-4 text-xl font-bold text-center text-gray-900">Erro na Aplicação</h1>
            <p className="mt-2 text-sm text-center text-gray-600">
              {this.state.error?.message || 'Um erro inesperado ocorreu.'}
            </p>
            <div className="mt-4 bg-red-50 border border-red-200 rounded p-3">
              <p className="text-xs font-mono text-red-700 break-words">
                {this.state.error?.toString()}
              </p>
            </div>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Recarregar Página
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
