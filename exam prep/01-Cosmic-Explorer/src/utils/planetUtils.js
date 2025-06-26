export function getTypeOptionsViewData(type) {
    const options = [
        { value: 'Inner', title: 'Inner' },
        { value: 'Outer', title: 'Outer' },
        { value: 'Dwarf', title: 'Dwarf' },

        
    ];
    return options.map(option => ({ ...option, selected: type === option.value ? 'selected' : '' }));
    
   
}
export function getRingsOptionsViewData(rings) {
    const options = [
        { value: 'Yes', title: 'Yes' },
        { value: 'No', title: 'No' },
       
    ];

    const result = options.map(option => ({ ...option, selected: rings === option.value ? 'selected' : '' }));
    
    
    return result;
}
