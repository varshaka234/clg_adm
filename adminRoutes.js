router.get("/public-ranklist", (req, res) => {
    const query = `
        SELECT s.name, e.marks, e.rank 
        FROM students s 
        JOIN exam_results e ON s.id = e.student_id 
        ORDER BY e.rank ASC;
    `;

    db.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json(results);
    });
});
