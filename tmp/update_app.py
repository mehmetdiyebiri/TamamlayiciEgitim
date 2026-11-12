with open('src/App.tsx', 'r', encoding='utf-8') as f:
    code = f.read()

# 1. Project Selection Grid
old_alim_card = """                      {schoolProjects.includes('alim') && (
                          <div onClick={() => { setActiveProject('alim'); setActiveTab('kelimelik'); }} className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-xl shadow-indigo-900/5 hover:shadow-2xl hover:border-indigo-500 cursor-pointer transition-all duration-300 flex flex-col items-center justify-center gap-6 text-center group">
                              <div className="w-28 h-28 bg-indigo-600 text-white rounded-[2rem] flex items-center justify-center group-hover:scale-110 group-hover:-translate-y-2 transition-all duration-300 shadow-lg shadow-indigo-600/30">
                                  <School size={48} />
                              </div>
                              <div>
                                  <div className="text-4xl font-black text-indigo-900 mb-2">Alim</div>
                                  <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">MAARİFMERKEZİ.COM</div>
                              </div>
                          </div>
                      )}"""

new_alim_card = """                      {schoolProjects.includes('alim') && (
                          <div onClick={() => { setActiveProject('alim'); setActiveTab('kelimelik'); }} className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-xl shadow-emerald-900/5 hover:shadow-2xl hover:border-emerald-500 cursor-pointer transition-all duration-300 flex flex-col items-center justify-center gap-6 text-center group">
                              <div className="w-28 h-28 bg-emerald-600 text-white rounded-[2rem] flex items-center justify-center group-hover:scale-110 group-hover:-translate-y-2 transition-all duration-300 shadow-lg shadow-emerald-600/30">
                                  <School size={48} />
                              </div>
                              <div>
                                  <div className="text-4xl font-black text-emerald-900 mb-2">Alim</div>
                                  <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">MAARİFMERKEZİ.COM</div>
                                  <div className="text-[11px] font-bold text-emerald-600 mt-1">Eğitim &amp; Gelişim Sistemi</div>
                              </div>
                          </div>
                      )}"""

old_pusula_card = """                      {schoolProjects.includes('pusula') && (
                          <div onClick={() => { setActiveProject('pusula'); setActiveTab('dashboard'); }} className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-xl shadow-teal-900/5 hover:shadow-2xl hover:border-teal-500 cursor-pointer transition-all duration-300 flex flex-col items-center justify-center gap-6 text-center group">
                              <div className="w-28 h-28 bg-teal-600 text-white rounded-[2rem] flex items-center justify-center group-hover:scale-110 group-hover:-translate-y-2 transition-all duration-300 shadow-lg shadow-teal-600/30">
                                  <Compass size={48} />
                              </div>
                              <div>
                                  <div className="text-4xl font-black text-teal-900 mb-2">Pusula</div>
                                  <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">MAARİFMERKEZİ.COM</div>
                                  <div className="text-[11px] font-bold text-teal-600 mt-1">Öğrenci Koçluk Sistemi</div>
                              </div>
                          </div>
                      )}"""

new_pusula_card = """                      {schoolProjects.includes('pusula') && (
                          <div onClick={() => { setActiveProject('pusula'); setActiveTab('dashboard'); }} className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-xl shadow-purple-900/5 hover:shadow-2xl hover:border-purple-500 cursor-pointer transition-all duration-300 flex flex-col items-center justify-center gap-6 text-center group">
                              <div className="w-28 h-28 bg-purple-600 text-white rounded-[2rem] flex items-center justify-center group-hover:scale-110 group-hover:-translate-y-2 transition-all duration-300 shadow-lg shadow-purple-600/30">
                                  <Compass size={48} />
                              </div>
                              <div>
                                  <div className="text-4xl font-black text-purple-900 mb-2">Pusula</div>
                                  <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">MAARİFMERKEZİ.COM</div>
                                  <div className="text-[11px] font-bold text-purple-600 mt-1">Öğrenci Koçluk Sistemi</div>
                              </div>
                          </div>
                      )}"""

if old_alim_card in code:
    code = code.replace(old_alim_card, new_alim_card)
    print("Replaced alim card")
else:
    print("Warning: old_alim_card not found")

if old_pusula_card in code:
    code = code.replace(old_pusula_card, new_pusula_card)
    print("Replaced pusula card")
else:
    print("Warning: old_pusula_card not found")

# 2. Main Container CSS variables and theme selection
old_main_div = "<div className={`min-h-screen bg-[#F8FAFC] font-inter text-gray-800 flex flex-col selection:bg-${activeProject === 'alim' ? 'indigo' : activeProject === 'pusula' ? 'teal' : activeProject === 'rahle' ? 'amber' : 'blue'}-100 selection:text-${activeProject === 'alim' ? 'indigo' : activeProject === 'pusula' ? 'teal' : activeProject === 'rahle' ? 'amber' : 'blue'}-900`} style={{ '--theme-color': activeProject === 'pusula' ? '#0d9488' : activeProject === 'rahle' ? '#d97706' : themeColors[activeProject === 'alim' ? 'indigo' : appTheme]?.[600] || '#2563eb', '--theme-bg': activeProject === 'pusula' ? '#f0fdfa' : activeProject === 'rahle' ? '#fffbeb' : themeColors[activeProject === 'alim' ? 'indigo' : appTheme]?.[50] || '#eff6ff' } as React.CSSProperties}>"

new_main_div = "<div className={`min-h-screen bg-[#F8FAFC] font-inter text-gray-800 flex flex-col selection:bg-${activeProject === 'alim' ? 'emerald' : activeProject === 'pusula' ? 'purple' : activeProject === 'rahle' ? 'amber' : 'blue'}-100 selection:text-${activeProject === 'alim' ? 'emerald' : activeProject === 'pusula' ? 'purple' : activeProject === 'rahle' ? 'amber' : 'blue'}-900`} style={{ '--theme-color': activeProject === 'pusula' ? '#9333ea' : activeProject === 'rahle' ? '#d97706' : activeProject === 'alim' ? '#059669' : themeColors[appTheme]?.[600] || '#2563eb', '--theme-bg': activeProject === 'pusula' ? '#faf5ff' : activeProject === 'rahle' ? '#fffbeb' : activeProject === 'alim' ? '#ecfdf5' : themeColors[appTheme]?.[50] || '#eff6ff' } as React.CSSProperties}>"

if old_main_div in code:
    code = code.replace(old_main_div, new_main_div)
    print("Replaced main div")
else:
    print("Warning: old_main_div not found")

# 3. Header Logo & Title Styles
code = code.replace("activeProject === 'alim' ? 'shadow-indigo-100' : activeProject === 'pusula' ? 'shadow-teal-100'", "activeProject === 'alim' ? 'shadow-emerald-100' : activeProject === 'pusula' ? 'shadow-purple-100'")
code = code.replace("activeProject === 'alim' ? 'text-indigo-900' : activeProject === 'pusula' ? 'text-teal-900'", "activeProject === 'alim' ? 'text-emerald-900' : activeProject === 'pusula' ? 'text-purple-900'")
code = code.replace("activeProject === 'alim' ? 'text-indigo-400' : activeProject === 'pusula' ? 'text-teal-600'", "activeProject === 'alim' ? 'text-emerald-600' : activeProject === 'pusula' ? 'text-purple-600'")

# 4. Header project switcher buttons
code = code.replace("activeProject === 'alim' ? 'bg-indigo-600 text-white shadow-xs'", "activeProject === 'alim' ? 'bg-emerald-600 text-white shadow-xs'")
code = code.replace("activeProject === 'pusula' ? 'bg-teal-600 text-white shadow-xs'", "activeProject === 'pusula' ? 'bg-purple-600 text-white shadow-xs'")

# 5. Teacher Nav Pusula section
code = code.replace("activeTab === 'dashboard' ? 'border-teal-600 text-teal-700'", "activeTab === 'dashboard' ? 'border-purple-600 text-purple-700'")
code = code.replace("activeTab === 'dashboard' ? 'text-teal-600'", "activeTab === 'dashboard' ? 'text-purple-600'")
code = code.replace("activeTab === 'resources' ? 'border-teal-600 text-teal-700'", "activeTab === 'resources' ? 'border-purple-600 text-purple-700'")
code = code.replace("activeTab === 'resources' ? 'text-teal-600'", "activeTab === 'resources' ? 'text-purple-600'")
code = code.replace("activeTab === 'exams' ? 'border-teal-600 text-teal-700'", "activeTab === 'exams' ? 'border-purple-600 text-purple-700'")
code = code.replace("activeTab === 'exams' ? 'text-teal-600'", "activeTab === 'exams' ? 'text-purple-600'")
code = code.replace("activeTab === 'plan' ? 'border-teal-600 text-teal-700'", "activeTab === 'plan' ? 'border-purple-600 text-purple-700'")
code = code.replace("activeTab === 'plan' ? 'text-teal-600'", "activeTab === 'plan' ? 'text-purple-600'")
code = code.replace("activeTab === 'notes' ? 'border-teal-600 text-teal-700'", "activeTab === 'notes' ? 'border-purple-600 text-purple-700'")
code = code.replace("activeTab === 'notes' ? 'text-teal-600'", "activeTab === 'notes' ? 'text-purple-600'")
code = code.replace("bg-teal-50 border border-teal-200 text-xs font-bold text-teal-800", "bg-purple-50 border border-purple-200 text-xs font-bold text-purple-800")
code = code.replace('text-teal-600">Öğrenci:</span>', 'text-purple-600">Öğrenci:</span>')
code = code.replace('text-teal-700 hover:text-teal-900 underline text-[11px]', 'text-purple-700 hover:text-purple-900 underline text-[11px]')

# 6. Alim Nav tabs (border-indigo-600 -> border-emerald-600, text-indigo-700 -> text-emerald-700, text-indigo-600 -> text-emerald-600)
for tab in ['kelimelik', 'mit', 'genelkultur', 'homework', 'makale', 'hizliokuma', 'bep', 'teacherperf', 'profile', 'admin']:
    code = code.replace(f"activeTab === '{tab}' ? 'border-indigo-600 text-indigo-700'", f"activeTab === '{tab}' ? 'border-emerald-600 text-emerald-700'")
    code = code.replace(f"activeTab === '{tab}' ? 'text-indigo-600'", f"activeTab === '{tab}' ? 'text-emerald-600'")

with open('src/App.tsx', 'w', encoding='utf-8') as f:
    f.write(code)

print('Successfully updated src/App.tsx')
