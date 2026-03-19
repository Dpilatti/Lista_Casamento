$(document).ready(function () {
    loadGuests();

    function loadGuests() {
        $.ajax({
            // Apontando para o arquivo JSON local ao invés da API
            url: 'backend.json',
            method: 'GET',
            dataType: 'json', // Garante que o jQuery interprete como JSON
            success: function (data) {
                renderTable(data);
                updateStats(data);
            },
            error: function (err) {
                console.error("Erro ao carregar o arquivo JSON:", err);
            }
        });
    }

    function renderTable(guests) {
        let html = '';
        guests.forEach(guest => {
            const isPresent = guest.STATUS === 'presente';
            html += `
                <tr class="border-b border-slate-100 hover:bg-slate-50 transition">
                    <td class="p-4 font-medium text-slate-700">${guest.NAME}</td>
                    <td class="p-4 text-slate-500 text-sm">${guest.CATEGORY}</td>
                    <td class="p-4">
                        <button onclick="toggleAccess(${guest.ID}, '${guest.STATUS}')" 
                                class="px-4 py-2 rounded-lg text-sm font-bold transition ${isPresent ? 'bg-green-100 text-green-700' : 'bg-slate-200 text-slate-700 hover:bg-indigo-600 hover:text-white'}">
                            ${isPresent ? '✓ Presente' : 'Confirmar Entrada'}
                        </button>
                    </td>
                </tr>
            `;
        });
        $('#guest-list').html(html);
    }

    window.toggleAccess = function (id, currentStatus) {
        const newStatus = currentStatus === 'presente' ? 'ausente' : 'presente';
        $.ajax({
            url: 'http://localhost:3000/api/guests/checkin',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ id: id, status: newStatus }),
            success: function () {
                loadGuests();
            }
        });
    }

    function updateStats(data) {
        const total = data.length;
        const present = data.filter(g => g.STATUS === 'presente').length;
        $('#stats').text(`Presença: ${present} / ${total}`);
    }
});