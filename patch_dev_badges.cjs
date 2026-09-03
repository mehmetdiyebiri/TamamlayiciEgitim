const fs = require('fs');
let code = fs.readFileSync('src/components/DevCardPanel.tsx', 'utf-8');

const badgesBlock = `            {/* Badges Section */}
            {(devCardConfig.manualBadges || []).length > 0 && (
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                  <h3 className="font-bold text-gray-800 flex items-center gap-2 mb-4"><Award size={18} className="text-blue-600"/> Rozetler</h3>
                  <div className="flex flex-wrap gap-2">
                      {devCardConfig.manualBadges.map((badge: any) => {
                          const hasBadge = devCardData.manualBadges?.includes(badge.id);
                          return (
                              <button
                                  key={badge.id}
                                  onClick={() => actions.handleToggleBadge && actions.handleToggleBadge(badge.id)}
                                  className={\`px-4 py-2 rounded-xl text-sm font-bold transition-all border \${hasBadge ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-200' : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'}\`}
                              >
                                  {badge.name}
                              </button>
                          );
                      })}
                  </div>
              </div>
            )}
            
            {/* Add Activity Form */}`;

code = code.replace(
  "{/* Add Activity Form */}",
  badgesBlock
);

fs.writeFileSync('src/components/DevCardPanel.tsx', code);
