        document.addEventListener('DOMContentLoaded', () => {
            // --- Element Selections ---
            const availableList = document.querySelector('#available-list ul');
            const selectedList = document.querySelector('#selected-list ul');

            const transferToSelectedBtn = document.getElementById('transfer-to-selected');
            const transferToAvailableBtn = document.getElementById('transfer-to-available');
            const moveUpBtn = document.getElementById('move-up');
            const moveDownBtn = document.getElementById('move-down');
            const confirmBtn = document.getElementById('confirm-btn');
            const closeBtns = document.querySelectorAll('.close-btn');

            const colTitleInput = document.getElementById('col-title');
            const colWidthInput = document.getElementById('col-width');
            const sortSelect = document.getElementById('sort-select');
            const alignSelect = document.getElementById('align-select');
            const footerControls = document.querySelector('.footer-controls');
            
            // === JAVASCRIPT MODIFIED ===
            const applyItemChangesBtn = document.getElementById('apply-item-changes-btn');

            // --- Functions ---

            const manageActiveState = (item) => {
                document.querySelectorAll('.list-container li').forEach(li => li.classList.remove('active'));
                
                transferToSelectedBtn.disabled = true;
                transferToAvailableBtn.disabled = true;
                moveUpBtn.disabled = true;
                moveDownBtn.disabled = true;
                
                footerControls.classList.add('disabled');
                
                clearForm();

                if (item) {
                    item.classList.add('active');
                    if (availableList.contains(item)) {
                        transferToSelectedBtn.disabled = false;
                    } else if (selectedList.contains(item)) {
                        transferToAvailableBtn.disabled = false;
                        moveUpBtn.disabled = false;
                        moveDownBtn.disabled = false;
                        
                        footerControls.classList.remove('disabled');
                        updateForm(item);
                    }
                }
            };

            const updateForm = (item) => {
                colTitleInput.value = item.dataset.title;
                colWidthInput.value = item.dataset.width;
                sortSelect.value = item.dataset.sort;
                alignSelect.value = item.dataset.align;
            };
            
            const clearForm = () => {
                colTitleInput.value = '';
                colWidthInput.value = '20';
                sortSelect.value = 'نزولی';
                alignSelect.value = 'راست';
            };

            const updateItemFromForm = () => {
                const activeItem = selectedList.querySelector('li.active');
                if (!activeItem) return;

                activeItem.dataset.title = colTitleInput.value;
                activeItem.textContent = colTitleInput.value;
                activeItem.dataset.width = colWidthInput.value;
                activeItem.dataset.sort = sortSelect.value;
                activeItem.dataset.align = alignSelect.value;
            };
            
            // --- Event Listeners ---
            document.querySelector('.modal-container').addEventListener('click', (e) => {
                if (e.target.tagName === 'LI') {
                    manageActiveState(e.target);
                }
            });

            transferToSelectedBtn.addEventListener('click', () => {
                const activeItem = availableList.querySelector('li.active');
                if (activeItem) {
                    selectedList.appendChild(activeItem);
                    manageActiveState(activeItem);
                }
            });

            transferToAvailableBtn.addEventListener('click', () => {
                const activeItem = selectedList.querySelector('li.active');
                if (activeItem) {
                    availableList.appendChild(activeItem);
                    manageActiveState(activeItem);
                }
            });
            
            moveUpBtn.addEventListener('click', () => {
                const activeItem = selectedList.querySelector('li.active');
                if (activeItem && activeItem.previousElementSibling) {
                    selectedList.insertBefore(activeItem, activeItem.previousElementSibling);
                }
            });

            moveDownBtn.addEventListener('click', () => {
                const activeItem = selectedList.querySelector('li.active');
                if (activeItem && activeItem.nextElementSibling) {
                    selectedList.insertBefore(activeItem.nextElementSibling, activeItem);
                }
            });
            
            // === JAVASCRIPT MODIFIED ===
            // Event listener for the new "Apply Changes" button
            applyItemChangesBtn.addEventListener('click', () => {
                updateItemFromForm();
                // Optional: Give user feedback
                const activeItem = selectedList.querySelector('li.active');
                if(activeItem) {
                    activeItem.style.transition = 'background-color 0.1s ease-in-out';
                    activeItem.style.backgroundColor = '#d1e7dd'; // A light green success color
                    setTimeout(() => {
                        activeItem.style.backgroundColor = ''; // Revert to default active color
                    }, 500);
                }
            });

            confirmBtn.addEventListener('click', () => {
                const selectedItems = [];
                selectedList.querySelectorAll('li').forEach(item => {
                    selectedItems.push({
                        title: item.dataset.title,
                        width: item.dataset.width,
                        align: item.dataset.align,
                        sort: item.dataset.sort
                    });
                });
                console.log("تنظیمات ستون‌های نهایی:", JSON.stringify(selectedItems, null, 2));
                alert('تنظیمات در کنسول مرورگر (F12) ثبت شد.');
            });
            
            closeBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    console.log('پنجره بسته شد.');
                    document.querySelector('.modal-container').style.display = 'none';
                });
            });
            
            // Initial State
            manageActiveState(null);
        });