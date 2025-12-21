# 🚀 Quick Start Guide - VectorShift Pipeline Builder

## What You Can Do Now

### 🎨 Build Pipelines
1. **Drag nodes** from the toolbar onto the canvas
2. **Connect nodes** by dragging from output handles (right) to input handles (left)
3. **Configure nodes** by typing in their input fields
4. **Move nodes** by dragging them around
5. **Delete nodes** by selecting and pressing Delete key

### ⌨️ Use Keyboard Shortcuts
- `Ctrl+Z` - Undo your last action
- `Ctrl+Y` - Redo
- `Ctrl+C` - Copy selected nodes
- `Ctrl+V` - Paste nodes (offset by 50px)
- `Delete` - Delete selected nodes (with confirmation)

### 💾 Save & Load
- Click **Export** to download your pipeline as JSON
- Click **Import** to load a saved pipeline
- Click **Clear** to start fresh (with confirmation)

### 🧪 Test Dynamic Variables
1. Add a **Text** node
2. Type: `Hello {{name}}, you are {{age}} years old!`
3. Watch as input handles appear automatically for `name` and `age`
4. Connect other nodes to these handles

### 📊 Submit & Analyze
1. Build your pipeline
2. Click **Submit Pipeline**
3. See analysis results:
   - Number of nodes
   - Number of edges
   - Whether it's a valid DAG (no cycles)

### 🎯 Try These Node Types

#### Input Node 📥
- Entry point for data
- Configure name and type (Text/File/Number/JSON)

#### Output Node 📤
- Exit point for results
- Configure name and type (Text/Image/File/JSON)

#### LLM Node 🤖
- AI model integration
- Choose model (GPT-4, Claude, etc.)
- Has system and prompt inputs

#### Text Node 📝
- Template with variables
- Type `{{variable}}` to create dynamic inputs
- Auto-resizing textarea

#### Filter Node 🔀
- Conditional branching
- Choose condition (equals, contains, etc.)
- Has true/false outputs

#### API Node 🌐
- HTTP requests
- Choose method (GET/POST/PUT/DELETE)
- Configure URL
- Has body, headers inputs and response, error outputs

#### Transform Node ⚡
- Data transformation
- Operations: uppercase, lowercase, JSON parse, etc.
- Custom expression support

#### Merge Node 🔗
- Combine multiple inputs
- Strategies: concat, array, object merge, etc.
- Up to 3 inputs

#### Note Node 📌
- Documentation
- Add comments and notes
- Dashed border style

---

## 🎬 Example Workflow

### Simple Pipeline
```
Input → Text → LLM → Output
```

1. Drag **Input** node
2. Drag **Text** node, type: `Summarize: {{input}}`
3. Connect Input → Text (to the `input` handle)
4. Drag **LLM** node
5. Connect Text → LLM (to the `prompt` handle)
6. Drag **Output** node
7. Connect LLM → Output
8. Click **Submit Pipeline**

### Conditional Pipeline
```
Input → Filter → (true) → Output A
              → (false) → Output B
```

1. Drag **Input** node
2. Drag **Filter** node, set condition
3. Connect Input → Filter
4. Drag two **Output** nodes
5. Connect Filter's `true` handle → Output A
6. Connect Filter's `false` handle → Output B
7. Click **Submit Pipeline**

### API Integration
```
Input → API → Transform → Output
```

1. Drag **Input** node
2. Drag **API** node, set URL and method
3. Connect Input → API (to `body` handle)
4. Drag **Transform** node
5. Connect API → Transform (from `response` handle)
6. Drag **Output** node
7. Connect Transform → Output
8. Click **Submit Pipeline**

---

## 🐛 Troubleshooting

### Backend Not Responding
```bash
# Make sure backend is running:
cd backend
python -m uvicorn main:app --reload
```

### Frontend Not Loading
```bash
# Restart frontend:
cd frontend
npm start
```

### Clear Browser Cache
- Press `Ctrl+Shift+R` (Windows/Linux)
- Press `Cmd+Shift+R` (Mac)

### Reset Everything
1. Click **Clear** button
2. Refresh browser
3. Restart both servers

---

## 💡 Pro Tips

1. **Use Shift** to select multiple nodes
2. **Hold Ctrl** while dragging to duplicate connections
3. **Double-click** empty space to deselect all
4. **Use the minimap** to navigate large pipelines
5. **Zoom** with mouse wheel or controls
6. **Pan** by dragging the background
7. **Export often** to save your work
8. **Use Notes** to document complex logic

---

## 🎉 You're Ready!

Open http://localhost:3000 and start building!

The application is now running with:
- ✅ All core features
- ✅ All bonus features
- ✅ Professional UI
- ✅ Full keyboard support
- ✅ Error handling
- ✅ Undo/Redo
- ✅ Export/Import
- ✅ And more!

**Have fun building pipelines!** 🚀
