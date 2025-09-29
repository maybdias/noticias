import React, { useState, useEffect } from 'react';
import { Type, Minus, Plus, Eye, Volume2, VolumeX } from 'lucide-react';

interface AccessibilityControlsProps {
  className?: string;
}

export default function AccessibilityControls({ className = '' }: AccessibilityControlsProps) {
  const [fontSize, setFontSize] = useState(100);
  const [highContrast, setHighContrast] = useState(false);
  const [speechEnabled, setSpeechEnabled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // Aplicar mudanças de fonte
  useEffect(() => {
    document.documentElement.style.fontSize = `${fontSize}%`;
  }, [fontSize]);

  // Aplicar alto contraste
  useEffect(() => {
    if (highContrast) {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }
  }, [highContrast]);

  // Função para aumentar fonte
  const increaseFontSize = () => {
    if (fontSize < 150) {
      setFontSize(prev => prev + 10);
    }
  };

  // Função para diminuir fonte
  const decreaseFontSize = () => {
    if (fontSize > 80) {
      setFontSize(prev => prev - 10);
    }
  };

  // Função para resetar fonte
  const resetFontSize = () => {
    setFontSize(100);
  };

  // Função para alternar alto contraste
  const toggleHighContrast = () => {
    setHighContrast(prev => !prev);
  };

  // Função para alternar leitura de tela
  const toggleSpeech = () => {
    setSpeechEnabled(prev => !prev);
    if (!speechEnabled) {
      // Ativar leitura automática de títulos quando habilitado
      const titles = document.querySelectorAll('h1, h2, h3');
      if (titles.length > 0 && 'speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance('Leitura de tela ativada');
        utterance.lang = 'pt-BR';
        utterance.rate = 0.8;
        speechSynthesis.speak(utterance);
      }
    } else {
      // Parar qualquer leitura em andamento
      if ('speechSynthesis' in window) {
        speechSynthesis.cancel();
      }
    }
  };

  // Função para ler texto em voz alta
  const speakText = (text: string) => {
    if (speechEnabled && 'speechSynthesis' in window) {
      speechSynthesis.cancel(); // Parar leitura anterior
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'pt-BR';
      utterance.rate = 0.8;
      speechSynthesis.speak(utterance);
    }
  };

  // Adicionar event listeners para leitura automática
  useEffect(() => {
    if (speechEnabled) {
      const handleClick = (e: Event) => {
        const target = e.target as HTMLElement;
        if (target.tagName === 'H1' || target.tagName === 'H2' || target.tagName === 'H3') {
          speakText(target.textContent || '');
        }
      };

      document.addEventListener('click', handleClick);
      return () => document.removeEventListener('click', handleClick);
    }
  }, [speechEnabled]);

  return (
    <div className={`relative ${className}`}>
      {/* Botão principal de acessibilidade */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-xl transition-all duration-200 
                 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-300 
                 focus:ring-offset-2 focus:ring-offset-blue-800 shadow-lg"
        title="Opções de Acessibilidade"
        aria-label="Abrir menu de acessibilidade"
      >
        <Eye className="h-5 w-5" />
      </button>

      {/* Menu de controles */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 bg-white rounded-2xl shadow-2xl border border-gray-200 
                      p-4 w-80 z-50 transform transition-all duration-200">
          <div className="mb-4">
            <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-center">
              <Eye className="h-5 w-5 mr-2 text-blue-600" />
              Acessibilidade
            </h3>
            <p className="text-sm text-gray-600">Ajuste a página para melhor visualização</p>
          </div>

          {/* Controles de fonte */}
          <div className="mb-6">
            <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
              <Type className="h-4 w-4 mr-2" />
              Tamanho da Fonte
            </h4>
            <div className="flex items-center justify-between bg-gray-50 rounded-xl p-3">
              <button
                onClick={decreaseFontSize}
                disabled={fontSize <= 80}
                className="bg-blue-100 hover:bg-blue-200 disabled:bg-gray-200 disabled:text-gray-400 
                         text-blue-800 p-2 rounded-lg transition-colors duration-200 
                         focus:outline-none focus:ring-2 focus:ring-blue-300"
                title="Diminuir fonte"
                aria-label="Diminuir tamanho da fonte"
              >
                <Minus className="h-4 w-4" />
              </button>
              
              <div className="flex flex-col items-center mx-4">
                <span className="text-sm font-medium text-gray-700">{fontSize}%</span>
                <button
                  onClick={resetFontSize}
                  className="text-xs text-blue-600 hover:text-blue-800 mt-1 underline"
                  title="Resetar fonte"
                >
                  Resetar
                </button>
              </div>
              
              <button
                onClick={increaseFontSize}
                disabled={fontSize >= 150}
                className="bg-blue-100 hover:bg-blue-200 disabled:bg-gray-200 disabled:text-gray-400 
                         text-blue-800 p-2 rounded-lg transition-colors duration-200 
                         focus:outline-none focus:ring-2 focus:ring-blue-300"
                title="Aumentar fonte"
                aria-label="Aumentar tamanho da fonte"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Controle de alto contraste */}
          <div className="mb-6">
            <h4 className="font-semibold text-gray-800 mb-3">Alto Contraste</h4>
            <button
              onClick={toggleHighContrast}
              className={`w-full p-3 rounded-xl font-medium transition-all duration-200 
                        focus:outline-none focus:ring-2 focus:ring-blue-300 ${
                highContrast
                  ? 'bg-gray-900 text-white hover:bg-gray-800'
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
              title="Alternar alto contraste"
              aria-label={`${highContrast ? 'Desativar' : 'Ativar'} alto contraste`}
            >
              {highContrast ? 'Desativar Alto Contraste' : 'Ativar Alto Contraste'}
            </button>
          </div>

          {/* Controle de leitura de tela */}
          <div className="mb-4">
            <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
              {speechEnabled ? <Volume2 className="h-4 w-4 mr-2" /> : <VolumeX className="h-4 w-4 mr-2" />}
              Leitura de Tela
            </h4>
            <button
              onClick={toggleSpeech}
              className={`w-full p-3 rounded-xl font-medium transition-all duration-200 
                        focus:outline-none focus:ring-2 focus:ring-blue-300 ${
                speechEnabled
                  ? 'bg-green-100 text-green-800 hover:bg-green-200'
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
              title="Alternar leitura de tela"
              aria-label={`${speechEnabled ? 'Desativar' : 'Ativar'} leitura de tela`}
            >
              {speechEnabled ? 'Leitura Ativada' : 'Ativar Leitura'}
            </button>
            {speechEnabled && (
              <p className="text-xs text-gray-600 mt-2 text-center">
                Clique nos títulos para ouvi-los
              </p>
            )}
          </div>

          {/* Botão para fechar */}
          <button
            onClick={() => setIsOpen(false)}
            className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 px-4 
                     rounded-xl transition-colors duration-200 focus:outline-none focus:ring-2 
                     focus:ring-gray-300"
          >
            Fechar
          </button>
        </div>
      )}
    </div>
  );
}