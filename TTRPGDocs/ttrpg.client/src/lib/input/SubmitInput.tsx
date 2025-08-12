
export function SubmitInput({ label, disabled }: { label: string, disabled?: boolean }) {
    return <input type="submit" value={label} disabled={disabled ?? false} />
}
