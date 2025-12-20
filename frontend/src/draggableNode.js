// draggableNode.js - Draggable node component for toolbar

const nodeIcons = {
  customInput: '📥',
  customOutput: '📤',
  llm: '🤖',
  text: '📝',
  filter: '🔀',
  api: '🌐',
  transform: '⚡',
  merge: '🔗',
  note: '📌'
};

const nodeTypeClasses = {
  customInput: 'input',
  customOutput: 'output',
  llm: 'llm',
  text: 'text',
  filter: 'filter',
  api: 'api',
  transform: 'transform',
  merge: 'merge',
  note: 'note'
};

export const DraggableNode = ({ type, label }) => {
  const onDragStart = (event, nodeType) => {
    const appData = { nodeType };
    event.target.style.cursor = 'grabbing';
    event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div
      className={`draggable-node ${nodeTypeClasses[type] || ''}`}
      onDragStart={(event) => onDragStart(event, type)}
      onDragEnd={(event) => (event.target.style.cursor = 'grab')}
      draggable
    >
      <div className="draggable-node-icon">
        {nodeIcons[type] || '📦'}
      </div>
      <span className="draggable-node-label">{label}</span>
    </div>
  );
};
