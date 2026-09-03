const fs = require('fs');
let code = fs.readFileSync('src/components/StudentDigitalNotebook.tsx', 'utf-8');

const oldHandleDelete = `  const handleDeleteResearch = async (id: string) => {
      const confirmDelete = window.confirm("Bu araştırmayı silmek istediğinize emin misiniz?");
      if (!confirmDelete) return;
      const newSaved = savedResearches.filter(r => r.id !== id);
      setSavedResearches(newSaved);
      await saveState(messages, newSaved);
  };`;

const newHandleDelete = `  const handleDeleteResearch = async (id: string) => {
      if (actions?.requestConfirm) {
          actions.requestConfirm("Bu araştırmayı silmek istediğinize emin misiniz?", async () => {
              const newSaved = savedResearches.filter(r => r.id !== id);
              setSavedResearches(newSaved);
              await saveState(messages, newSaved);
          });
      } else {
          const confirmDelete = window.confirm("Bu araştırmayı silmek istediğinize emin misiniz?");
          if (!confirmDelete) return;
          const newSaved = savedResearches.filter(r => r.id !== id);
          setSavedResearches(newSaved);
          await saveState(messages, newSaved);
      }
  };`;

code = code.replace(oldHandleDelete, newHandleDelete);
fs.writeFileSync('src/components/StudentDigitalNotebook.tsx', code);
