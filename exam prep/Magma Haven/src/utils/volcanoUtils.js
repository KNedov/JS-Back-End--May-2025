export function getTypeOptionsViewData(type) {
    const options = [
        { value: 'Supervolcanoes', title: 'Supervolcanoes' },
        { value: 'Submarine', title: 'Submarine' },
        { value: 'Subglacial', title: 'Subglacial' },
        { value: 'Mud', title: 'Mud' },
        { value: 'Stratovolcanoes', title: 'Stratovolcanoes' },
        { value: 'Shield', title: 'Shield' },

        
    ];
    return options.map(option => ({ ...option, selected: type === option.value ? 'selected' : '' }));
    
   
}

