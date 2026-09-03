const fs = require('fs');
let code = fs.readFileSync('src/components/PortfolioPanel.tsx', 'utf-8');

const replacement = `
                                    <div className="text-sm font-semibold text-blue-200/80">{totalDevTags} Aktivite Kaydı Bulundu</div>
                                    {(devCardData?.manualBadges && devCardData.manualBadges.length > 0) && (
                                        <div className="mt-4 pt-4 border-t border-white/10 flex flex-wrap gap-1.5">
                                            {devCardData.manualBadges.map((badgeId: any, idx: number) => {
                                                const badgeObj = devCardConfig?.manualBadges?.find((b: any) => b.id === badgeId);
                                                if (!badgeObj) return null;
                                                return (
                                                    <span key={idx} className="bg-blue-500/30 text-blue-100 text-[10px] px-2 py-1 rounded-md font-bold truncate max-w-full" title={badgeObj.name}>
                                                        {badgeObj.name}
                                                    </span>
                                                );
                                            })}
                                        </div>
                                    )}
`;

code = code.replace('<div className="text-sm font-semibold text-blue-200/80">{totalDevTags} Aktivite Kaydı Bulundu</div>', replacement);
fs.writeFileSync('src/components/PortfolioPanel.tsx', code);
console.log("Patched PortfolioPanel.tsx");
