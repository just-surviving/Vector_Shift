// useKeyboardShortcuts.js - Custom hook for keyboard shortcuts

import { useEffect } from 'react';
import { useStore } from '../store';

export const useKeyboardShortcuts = () => {
  const undo = useStore((state) => state.undo);
  const redo = useStore((state) => state.redo);
  const deleteSelectedNodes = useStore((state) => state.deleteSelectedNodes);
  const copySelectedNodes = useStore((state) => state.copySelectedNodes);
  const pasteNodes = useStore((state) => state.pasteNodes);
  const nodes = useStore((state) => state.nodes);

  useEffect(() => {
    const handleKeyDown = (event) => {
      // Check if user is typing in an input/textarea
      const isInputFocused = 
        event.target.tagName === 'INPUT' || 
        event.target.tagName === 'TEXTAREA' ||
        event.target.isContentEditable;

      // Ctrl/Cmd + Z - Undo
      if ((event.ctrlKey || event.metaKey) && event.key === 'z' && !event.shiftKey) {
        event.preventDefault();
        undo();
        return;
      }

      // Ctrl/Cmd + Y or Ctrl/Cmd + Shift + Z - Redo
      if (
        ((event.ctrlKey || event.metaKey) && event.key === 'y') ||
        ((event.ctrlKey || event.metaKey) && event.shiftKey && event.key === 'z')
      ) {
        event.preventDefault();
        redo();
        return;
      }

      // Don't handle other shortcuts if input is focused
      if (isInputFocused) return;

      // Delete or Backspace - Delete selected nodes
      if (event.key === 'Delete' || event.key === 'Backspace') {
        const hasSelectedNodes = nodes.some(n => n.selected);
        if (hasSelectedNodes) {
          event.preventDefault();
          if (window.confirm('Delete selected nodes?')) {
            deleteSelectedNodes();
          }
        }
        return;
      }

      // Ctrl/Cmd + C - Copy
      if ((event.ctrlKey || event.metaKey) && event.key === 'c') {
        const hasSelectedNodes = nodes.some(n => n.selected);
        if (hasSelectedNodes) {
          event.preventDefault();
          copySelectedNodes();
        }
        return;
      }

      // Ctrl/Cmd + V - Paste
      if ((event.ctrlKey || event.metaKey) && event.key === 'v') {
        event.preventDefault();
        pasteNodes();
        return;
      }

      // Ctrl/Cmd + A - Select all nodes
      if ((event.ctrlKey || event.metaKey) && event.key === 'a') {
        event.preventDefault();
        // This will be handled by React Flow
        return;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [undo, redo, deleteSelectedNodes, copySelectedNodes, pasteNodes, nodes]);
};
