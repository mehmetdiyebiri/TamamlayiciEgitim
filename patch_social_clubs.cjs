const fs = require('fs');
let code = fs.readFileSync('src/components/SocialClubsPanel.tsx', 'utf-8');

code = code.replace(
  "if (currentUser.role === 'student' || currentUser.role === 'parent') {",
  "if (currentUser.role === 'student' || currentUser.role === 'parent' || currentUser.role === 'öğrenci') {"
);

// We also need to show all members in the club, not just board members.
const newSection = `
                                    <div className="bg-white p-4 rounded-2xl border border-blue-100 mt-4">
                                        <h4 className="text-xs font-black text-gray-400 uppercase tracking-wider mb-3">Tüm Üyeler ({(club.members || []).length})</h4>
                                        <div className="space-y-3 max-h-48 overflow-y-auto custom-scrollbar pr-2">
                                            {(club.members || []).length > 0 ? (club.members || []).map((bm: any, idx: number) => {
                                                const u = users.find((usr: any) => usr.id === bm.userId);
                                                return (
                                                    <div key={idx} className="flex justify-between items-center bg-gray-50 p-2 rounded-xl">
                                                        <span className="font-bold text-sm text-gray-700 whitespace-nowrap overflow-hidden text-ellipsis mr-2">{u ? (u.name || u.username) : 'Bilinmeyen'}</span>
                                                        <span className="shrink-0">{getRoleBadge(bm.role)}</span>
                                                    </div>
                                                );
                                            }) : <span className="text-sm font-medium text-gray-400 italic">Üye bulunmuyor.</span>}
                                        </div>
                                    </div>
`;

code = code.replace(
  "                                    </div>\n                                </div>\n                            );\n                        })}\n                    </div>",
  newSection + "                                </div>\n                            );\n                        })}\n                    </div>"
);

fs.writeFileSync('src/components/SocialClubsPanel.tsx', code);
